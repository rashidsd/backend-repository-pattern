import { dashboardTile } from "../../Entities/entities";
import { QueryTypes } from "sequelize";
import db from "../../db.config"


async function dbProduction(unitId:string,orderCategory:string): Promise<dashboardTile[]> {

    var productionDashboard = new Set<dashboardTile>();

    const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
    const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
 
 
    let result: any;


//Total Articles 
    result = await db.query(
     "Select ISNULL(Count(*),0)totalArticles from WG_Items Where ISNULL(Active,0)=1 " + UID,
      {
        replacements: { ...replacementObject},
        type: QueryTypes.SELECT,
      }
    );
    const TotalArticles = result[0].totalArticles;

    var totalArticles: dashboardTile = {
     heading: "Total Articles",
     value: TotalArticles,
     valueInPerc: -1,
     detailLink: `productionDashboardDetail/Total Articles/totalArticles/${unitId}/${orderCategory}`,
     
   };
   productionDashboard.add(totalArticles);

//Open Orders
result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))openOrders from WG_Order_Master WHere Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0" + UID,
     {
       replacements: { ...replacementObject,orderCategory:orderCategory},
       type: QueryTypes.SELECT,
     }
   );
   const OpenOrders = result[0].openOrders;

   var openOrders: dashboardTile = {
    heading: "Open Orders",
    value: OpenOrders,
    valueInPerc: -1,
    detailLink: `productiondashboardDetail/Open Orders/openOrders/${unitId}/${orderCategory}`,
    color:'#1b5e20'
  };
  productionDashboard.add(openOrders);

 //Late Shipments
result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))lateShipments from WG_Order_Master Where Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0 AND ShipmentDate <= Convert(Date,GetDate())" + UID,
     {
       replacements: { ...replacementObject,orderCategory:orderCategory},
       type: QueryTypes.SELECT,
     }
   );
   const LateShipments = result[0].lateShipments;

   var lateShipments: dashboardTile = {
    heading: "Late Shipments",
    value: LateShipments,
    valueInPerc: -1,
    detailLink: `productiondashboardDetail/Late Shipments/lateShipments/${unitId}/${orderCategory}`,
    color:'#dd2c00'
  };
  productionDashboard.add(lateShipments);

//Upcomming Shipments
result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))upCommingShipments from WG_Order_Master Where Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0 AND ShipmentDate > Convert(Date,GetDate())" + UID,
     {
       replacements: { ...replacementObject,orderCategory:orderCategory},
       type: QueryTypes.SELECT,
     }
   );
   const UpcommingShipments = result[0].upCommingShipments;

   var upcommingShipments: dashboardTile = {
    heading: "Upcomming Shipments",
    value: UpcommingShipments,
    valueInPerc: -1,
    detailLink: `productiondashboardDetail/Upcomming Shipments/upcommingShipments/${unitId}/${orderCategory}`,
    color:'#827717'
  };
  productionDashboard.add(upcommingShipments);


  //pending BOMs
result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))pendingBOMs from WG_Order_Master WHere Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0  AND OrderID NOT In (select OrderID from Stock_BOMMaster)" + UID,
     {
       replacements: { ...replacementObject,orderCategory:orderCategory},
       type: QueryTypes.SELECT,
     }
   );
   const PendingBOMs = result[0].pendingBOMs;

   var pendingBOMs: dashboardTile = {
    heading: "Pending BOMs",
    value: PendingBOMs,
    valueInPerc: -1,
    detailLink: `productiondashboardDetail/Pending BOMs/pendingBOMs/${unitId}/${orderCategory}`,
    color:'#ff9800'
  };
    productionDashboard.add(pendingBOMs);


   //Production Status Received Based (Order Wise)
   productionDashboard.add({
    heading: "Production Status",
    value: 0,
    valueInPerc: -1,
    subHeading:' Order Wise',
    detailLink: `productiondashboardDetail/Production Status (Order Wise)/productionStatus/${unitId}/${orderCategory}`,
    color:'#757575'
  });

     //Production Status Received Based (Article Wise)
     productionDashboard.add({
      heading: "Production Status",
      value: 0,
      valueInPerc: -1,
      subHeading:' Article Wise',
      detailLink: `productiondashboardDetail/Production Status (Article Wise)/productionStatusArticleWise/${unitId}/${orderCategory}`,
      color:'#607d8b'
    });

         //Production Status Received Based (Article Wise)
         productionDashboard.add({
          heading: "Production Status",
          value: 0,
          valueInPerc: -1,
          subHeading:'Color Wise',
          detailLink: `productiondashboardDetail/Production Status (Color Wise)/productionStatusColorWise/${unitId}/${orderCategory}`,
          color:'#0091ea'
        });
    

    return [...productionDashboard];
}


async function dbProductionDetail(
  tag: string,
  unitId: string,
  orderCategory: string
): Promise<any[]> {
  const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
  const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
  let result: any;
  

  if (tag === "totalArticles") {
    result = await db.query(
        "select i.ItemID as ID,UnitName as ProductionUnit,ItemID as ArticleNo,Named as Article, c.ProductionName as Customer,i.CustItemCode  from WG_Items i left join CompanyUnit u on UnitID = ID left join Stock_Customers c on i.customerID = c.CustCode " + `${unitId==='000' ?'':' Where i.UnitID=:UnitID'}`,
      {
        replacements: { ...replacementObject, empCategory: orderCategory },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag === "openOrders") {
      result = await db.query(
        "select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND Order_Category=:orderCategory " + `${unitId==='000' ?'':' AND m.UnitID=:UnitID'}`,
      {
        replacements: { ...replacementObject, orderCategory: orderCategory },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag === "lateShipments") {
    result = await db.query(
        "select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND m.ShipmentDate <= Convert(Date,GetDate())  AND Order_Category=:orderCategory " + `${unitId==='000' ?'':' AND m.UnitID=:UnitID'}`,
    {
      replacements: { ...replacementObject, orderCategory: orderCategory },
      type: QueryTypes.SELECT,
    }
  );
}else if (tag === "upcommingShipments") {
    result = await db.query(
        "select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND m.ShipmentDate > Convert(Date,GetDate())  AND Order_Category=:orderCategory " + `${unitId==='000' ?'':' AND m.UnitID=:UnitID'}`,
    {
      replacements: { ...replacementObject, orderCategory: orderCategory },
      type: QueryTypes.SELECT,
    }
  );
}else if (tag === "pendingBOMs") {
    result = await db.query(
        "select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND m.OrderID NOT IN (select OrderID from Stock_BOMMaster)  AND Order_Category=:orderCategory " + `${unitId==='000' ?'':' AND m.UnitID=:UnitID'}`,
    {
      replacements: { ...replacementObject, orderCategory: orderCategory },
      type: QueryTypes.SELECT,
    }
  );
}else if (tag === "productionStatus") {
    result = await db.query(
        "Exec sp_PSOrderWiseRecvBased $orderCategory,$UnitID",
    {
      bind: { ...replacementObject, orderCategory: orderCategory },
      type: QueryTypes.SELECT,
    }
  );
}else if (tag === "productionStatusArticleWise") {
  result = await db.query(
      "Exec sp_PSItemWiseRecvBased $orderCategory,$UnitID",
  {
    bind: { ...replacementObject, orderCategory: orderCategory },
    type: QueryTypes.SELECT,
  }
);
}else if (tag === "productionStatusColorWise") {
  result = await db.query(
      "Exec sp_PSColourWiseRecvBased $orderCategory,$UnitID",
  {
    bind: { ...replacementObject, orderCategory: orderCategory },
    type: QueryTypes.SELECT,
  }
);
}

  return result;
}

export  {dbProduction,dbProductionDetail}