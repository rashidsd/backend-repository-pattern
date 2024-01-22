import { dashboardTile } from "../../Entities/entities";
import dayjs from 'dayjs'
import { QueryTypes } from "sequelize";
import db from "../../db.config"

async function dbStock(store:string,fromDate:string,toDate:string ): Promise<dashboardTile[]> {

    var stockDashboard = new Set<dashboardTile>();
    const storeQry = store === "All" ? "" : " AND store=:store";
    const replacementObject = store === "All" ? {} : { store: store };

    fromDate=dayjs(new Date(fromDate)).format("YYYY-MM-DD")
    toDate=dayjs(new Date(toDate)).format("YYYY-MM-DD")
    

    let result: any;


    //Total Purchase
    result = await db.query(
      "select Round(ISNULL(SUM(NetAmount),0),0)totalPurchase from Stock_Receive_Master m left join Stock_Receive_Detail d on m.RecvNo = d.RecvNo Where Dated between :fromDate and :toDate AND m.ReceiveType<>'InternalTransfer' "+  `${store === "All" ? "" : " AND d.store=:store"}`,
      {
        replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
        type: QueryTypes.SELECT,
      }
    );
    const TotalPurchase = result[0].totalPurchase;
    var totalPurchase: dashboardTile = {
     heading: "Total Purchase",
     value: TotalPurchase,
     valueInPerc: -1,
     detailLink: `stockdashboardDetail/monthWiseReceiving/Total Purchase/totalPurchase/${store}/${fromDate}/${toDate}`,
     color:'#1b5e20',
     
   };
   stockDashboard.add(totalPurchase);

   //Total Receiving
   result = await db.query(
    "Select Round(ISNULL(SUM(NetAmount),0),0)totalReceiving from Stock_Receive_Detail d left join Stock_Receive_Master m on d.RecvNo = m.RecvNo  where m.Dated between :fromDate and :toDate and ReceiveType <>'InternalTransfer' " +  `${store === "All" ? "" : " AND d.store=:store"}`,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const TotalReceiving = result[0].totalReceiving;
  var totalReceiving: dashboardTile = {
   heading: "Total Receiving",
   value: TotalReceiving,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Total Receiving/totalReceiving/${store}/${fromDate}/${toDate}`,
   color:'#66bb6a',
   
 };
 stockDashboard.add(totalReceiving);

 //Total un-Approved Demands
 result = await db.query(
    "select ISNULL(Count(*),0)unApprovedDemands from Stock_DemandMaster where ISNULL(IsApproved,0)=0 AND Dated between :fromDate AND :toDate " +  storeQry,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const UnApprovedDemands = result[0].unApprovedDemands;
  var unApprovedDemands: dashboardTile = {
   heading: "Un-Approved Demands",
   value: UnApprovedDemands,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Un-Approved Demands/unApprovedDemands/${store}/${fromDate}/${toDate}`,
   color:'#ff6d00',
   
 };
 stockDashboard.add(unApprovedDemands);

 //Total pdending Demands
 result = await db.query(
    "Select ISNULL(Count(*),0)pendingDemands from DB_VPendingDemands Where Dated between :fromDate AND :toDate" + storeQry,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const PendingDemands = result[0].pendingDemands;
  var pendingDemands: dashboardTile = {
   heading: "Pending Demands",
   value: PendingDemands,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Pending Demands/pendingDemands/${store}/${fromDate}/${toDate}`,
   color:'#bf360c',
   
 };
 stockDashboard.add(pendingDemands);


 //Total unApproved POs
 result = await db.query(
    "select Convert(float,ISNULL(Count(PONo),0))unApprovedPOs from Stock_PO_Master Where Order_Date between :fromDate AND :toDate AND Internal_External<>'Services' AND  Internal_External <>  'Process' AND ISNULL(Cancel,0)=0  AND ISNULL(IsApproved,0)=0 AND Store IS NOT NULL " + storeQry,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const UnApprovedPOs = result[0].unApprovedPOs;
  var unApprovedPOs: dashboardTile = {
   heading: "Un-Approved POs",
   value: UnApprovedPOs,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Un-Approved POs/unApprovedPOs/${store}/${fromDate}/${toDate}`,
   color:'#bf360c',
   
 };
 stockDashboard.add(unApprovedPOs);


 //Un Received Pos
 result = await db.query(
    "select Count(distinct pono)unReceivedPos from ( Select m.Store,m.Order_Date as Dated, m.PONo,d.DemandNo,d.OrderNo, o.CustomerProdNme as Customer,d.Item_Name as Material, d.Qty,r.PONo as RecvPONo  from Stock_PO_Detail d left join Stock_PO_Master m on d.PONo=m.PONo left join WG_VOrderMaster o on d.OrderNo = o.OrderID left join Stock_Receive_Detail r on d.PONo = r.PONo AND d.DemandNo =r.DemandNo and d.OrderNo =r.OrderNo and d.Item_Code =r.Item_Code  Where m.order_Date between :fromDate AND :toDate AND m.Internal_External <>'Services' AND m.Internal_External <> 'Process' AND ISNULL(m.IsApproved,0)=1 and ISNULL(m.Cancel,0)=0 and r.PONo is null "  + `${store === "All" ? "" : " AND m.store=:store"}` + ")x",
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const UnReceivedPOs = result[0].unReceivedPos;
  var unReceivedPOs: dashboardTile = {
   heading: "Un-Received POs",
   value: UnReceivedPOs,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Un-Received POs/unReceivedPOs/${store}/${fromDate}/${toDate}`,
   color:'#bf360c',
   
 };
 stockDashboard.add(unReceivedPOs);


 //Un Gate pass without inspection
 result = await db.query(
    "with cte as (select distinct Gate_PassNo,Store from Gate_Stock_Receiving_Detail Where LEN(ISNULL(InspNo ,''''))=0 ) Select ISNULL(Count(*),0)gatePassWithoutInspection from cte left join Gate_Stock_Receiving_Master m on cte.Gate_PassNo = m.Gate_PassNo Where Dated between :fromDate AND :toDate " +  `${store === "All" ? "" : " AND cte.store=:store"}`,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const GateWithoutInspection = result[0].gatePassWithoutInspection;
  var getPassWithoutInspection: dashboardTile = {
   heading: "Gate pass without inspection",
   value: GateWithoutInspection,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Gate Pass Without Inspection/gatePassWithoutInspection/${store}/${fromDate}/${toDate}`,
   color:'#455a64',
   
 };
 stockDashboard.add(getPassWithoutInspection);


//Un Received Inspection
 result = await db.query(
    "With cte as (select Distinct Store,Dated,Gate_PassNo,InspNo ,VendorCode ,VendorName from Gate_Stock_VReceiving Where LEN(ISNULL(InspNo,''''))>0 AND LEN(ISNULL(RTrim(Ltrim(ReceiveNo)),''''))=0 ) Select Convert(float,ISNULL(Count(*),0))unReceivedInspection from cte Where Dated between :fromDate AND :toDate " + storeQry,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const UnReceivedInspections = result[0].unReceivedInspection;
  var unReceivedInspections: dashboardTile = {
   heading: "Un-Received Inspections",
   value: UnReceivedInspections,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Un-Received Inspection/unReceivedInspection/${store}/${fromDate}/${toDate}`,
   color:'#bf360c',
 };
 stockDashboard.add(unReceivedInspections);


 //Un Close Receiving
 result = await db.query(
    "Select Convert(float,Count(RecvNo))unCloseReceiving from Stock_Receive_Master Where Dated between :fromDate AND :toDate AND  RecvNo In (select RecvNo  from Stock_Receive_Detail Where LEN(ISNULL(CloseNo,''''))=0) AND ReceiveType<>'InternalTransfer' " + storeQry,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const UnCloseReceiving = result[0].unCloseReceiving;
  var unCloseReceiving: dashboardTile = {
   heading: "Un-Close Receiving",
   value: UnCloseReceiving,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Un-Close Receiving/unCloseReceiving/${store}/${fromDate}/${toDate}`,
   color:'#bf360c',
 };
 stockDashboard.add(unCloseReceiving);

 //Un Posted Bills
 result = await db.query(
    "Select Convert(float,Count(ClearanceNo))unpostedBills from Stock_PO_Clearance_Master Where ISNULL(IsPosted,0)=0 AND Dated between :fromDate AND :toDate" + storeQry,
    {
      replacements: { ...replacementObject, fromDate: fromDate ,toDate:toDate },
      type: QueryTypes.SELECT,
    }
  );
  const UnPostedBills = result[0].unpostedBills;
  var unPostedBills: dashboardTile = {
   heading: "Un-Posted Bills",
   value: UnPostedBills,
   valueInPerc: -1,
   detailLink: `stockdashboardDetail/Un-Posted Bills/unPostedBills/${store}/${fromDate}/${toDate}`,
   color:'#bf360c',
 };
 stockDashboard.add(unPostedBills);
    return [...stockDashboard]
}



async function dbStockDetail(
  tag: string,
  store: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  const storeQry = store === "All" ? "" : " AND store=:store";
  const replacementObject = store === "All" ? {} : { store: store };
  fromDate = dayjs(new Date(fromDate)).format("YYYY-MM-DD");
  toDate = dayjs(new Date(toDate)).format("YYYY-MM-DD");

  let result: any;

  if (tag === "totalPurchase") {
    result = await db.query(
      "Select x.VendorCode as ID,x.Store,x.VendorCode as Code,VendorName as Vendor,Internal_External as Category ,Amount from ( Select store,VendorCode,Internal_External,Round(ISNULL(SUM(Amount),0),0)Amount from ( Select d.Store,VendorCode,Internal_External,ISNULL(d.NetAmount,0)Amount from Stock_PO_Master m left join Stock_PO_Detail d on m.PONo = d.PONo Where Internal_External <>'Services' AND Order_Date between :fromDate AND :toDate AND ISNULL(isApproved,0)=1 AND ISNULL(Cancel,0)=0 )PO group by Store,VendorCode,Internal_External )x left join Stock_Vendors v on x.VendorCode = v.VendorCode " +
        `${store === "All" ? "" : " AND x.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }
  if (tag === "totalReceiving") {
    result = await db.query(
      `Select x.VendorCode as ID,x.Store,x.VendorCode as Code,VendorName as Vendor,ReceiveType as Category ,Amount from ( Select store,VendorCode,ReceiveType,Round(ISNULL(SUM(Amount),0),0)Amount from ( Select d.Store,VendorCode,ReceiveType,ISNULL(d.NetAmount,0)Amount from Stock_Receive_Master  m left join Stock_Receive_Detail d on m.RecvNo = d.RecvNo Where ReceiveType <>'InternalTransfer' AND Dated between :fromDate AND :toDate ${
        store === "All" ? "" : " AND d.store=:store"
      })recv group by Store,VendorCode,ReceiveType )x left join Stock_Vendors v on x.VendorCode = v.VendorCode`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "unApprovedDemands") {
    result = await db.query(
      "select d.DetailIndex as ID,m.Store,Dated,m.DemandNo,OrderNo,o.CustomerProdNme as Customer,Item_Name as Material,Qty from Stock_DemandMaster m left join Stock_DemandDetail d on m.DemandNo = d.DemandNo left join WG_VOrderMaster o on d.OrderNo = o.OrderID where ISNULL(IsApproved,0)=0 AND Dated between :fromDate AND :toDate and ISNULL(d.IsCleared,0)=0 AND ISNULL(d.DemandAlreadyMadeAgainstStock,0)=0 " +
      `${store === "All" ? "" : " AND m.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "pendingDemands") {
    result = await db.query(
      "select ROW_NUMBER() over (order by GetDate())ID,Store,Dated,DemandNo ,OrderNo,Customer,item_name as Material,Qty  from DB_VPendingDemands Where Dated between :fromDate AND :toDate " + storeQry,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "unApprovedPOs") {
    result = await db.query(
      "select d.Detailindex as ID,m.Store,m.Order_Date as Dated,m.PONo,DemandNo,d.OrderNo, o.CustomerProdNme as Customer,d.Item_Name as Material,d.Qty  from Stock_PO_Master m left join Stock_PO_Detail d on m.PONo =d.PONo left join WG_VOrderMaster o on d.OrderNo = o.OrderID  Where m.Order_Date between :fromDate AND :toDate AND Internal_External<>'Services' AND Internal_External <>'Process' AND ISNULL(Cancel,0)=0 and ISNULL(isApproved,0)=0 " + `${store === "All" ? "" : " AND m.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "unReceivedPOs") {
    result = await db.query(
      "Select d.DetailIndex as ID,m.Store,m.Order_Date as Dated, m.PONo,d.DemandNo,d.OrderNo, o.CustomerProdNme as Customer,d.Item_Name as Material, d.Qty from Stock_PO_Detail d left join Stock_PO_Master m on d.PONo=m.PONo left join WG_VOrderMaster o on d.OrderNo = o.OrderID left join Stock_Receive_Detail r on d.PONo = r.PONo AND d.DemandNo =r.DemandNo and d.OrderNo =r.OrderNo and d.Item_Code =r.Item_Code  Where m.order_Date between :fromDate AND :toDate AND m.Internal_External <>'Services' AND m.Internal_External <>'Process' AND ISNULL(m.IsApproved,0)=1 and ISNULL(m.Cancel,0)=0 and r.PONo is null " +  `${store === "All" ? "" : " AND d.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "gatePassWithoutInspection") {
    result = await db.query(
      "Select d.DetailIndex as ID,d.Store,Dated,d.Gate_PassNo,d.PONo,d.OrderNo ,Item_Name as Material,Qty from Gate_Stock_Receiving_Detail d left join Gate_Stock_Receiving_Master m on d.Gate_PassNo =m.Gate_PassNo Where LEN(ISNULL(d.InspNo,''''))=0 and m.Dated between :fromDate and :toDate " +  `${store === "All" ? "" : " AND d.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "unReceivedInspection") {
    result = await db.query(
      " Select d.DetailIndex as ID,d.Store,Dated,d.Gate_PassNo,d.OrderNo,o.CustomerProdNme as Customer,Item_Name as Material,Qty  from Gate_Stock_Receiving_Master m left join Gate_Stock_Receiving_Detail d on m.Gate_PassNo =d.Gate_PassNo left join WG_VOrderMaster o on d.OrderNo = o.OrderID   where Dated between :fromDate and :toDate and LEN(ISNULL(InspNo,''''))>0 and LEN(RTRIM(LTRIM(ISNULL(d.ReceiveNo,''''))))>0   " +  `${store === "All" ? "" : " AND d.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "unCloseReceiving") {
    result = await db.query(
      " Select Row_Number() over (order by GetDate())ID,d.Store,  Dated, d.RecvNo,d.OrderNo,VendorName as Vendor,Item_Name as Material,Qty from Stock_Receive_Master m Left join Stock_Receive_Detail d on m.RecvNo = d.recvNo   left join Stock_Vendors v on m.VendorCode = v.VendorCode  Where  Dated between :fromDate AND :toDate AND m.ReceiveType <> 'InternalTransfer' and LEN(ISNULL(d.CloseNo,''''))=0 " +  `${store === "All" ? "" : " AND d.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }if (tag === "unPostedBills") {
    result = await db.query(
      " Select d.DetailIndex as ID,d.Store,Dated,d.ClearanceNo,ClearanceType,VendorName as Vendor ,d.PONo,Qty,Rate,ROUND(ISNULL(Amount,0),0)Amount from Stock_PO_Clearance_Detail d left join Stock_PO_Clearance_Master m on d.ClearanceNo = m.ClearanceNo Left join Stock_Vendors v on m.VendorCode = v.VendorCode Where Dated between :fromDate AND :toDate and ISNULL(isPosted,0)=0" +  `${store === "All" ? "" : " AND d.store=:store"}`,
      {
        replacements: {
          ...replacementObject,
          fromDate: fromDate,
          toDate: toDate,
          store: store,
        },
        type: QueryTypes.SELECT,
      }
    );
  }

  return result;
}

async function dbStockReceivingMonthWise(
  store: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  const result = await db.query(
    "Select period,Stock,Import,Asset,General,Process from fn_MonthWiseStockReceiving(:fromDate,:toDate,:store) order by y,m ",
    {
      replacements: {
        fromDate: fromDate,
        toDate: toDate,
        store: store,
      },
   type:QueryTypes.SELECT
    }
  );
  return result;
}


export { dbStock,dbStockDetail,dbStockReceivingMonthWise };
