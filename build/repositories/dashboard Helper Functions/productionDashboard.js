"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProductionDetail = exports.dbProduction = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../db.config"));
function dbProduction(unitId, orderCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        var productionDashboard = new Set();
        const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
        const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
        let result;
        //Total Articles 
        result = yield db_config_1.default.query("Select ISNULL(Count(*),0)totalArticles from WG_Items Where ISNULL(Active,0)=1 " + UID, {
            replacements: Object.assign({}, replacementObject),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const TotalArticles = result[0].totalArticles;
        var totalArticles = {
            heading: "Total Articles",
            value: TotalArticles,
            valueInPerc: -1,
            detailLink: `productionDashboardDetail/Total Articles/totalArticles/${unitId}/${orderCategory}`,
        };
        productionDashboard.add(totalArticles);
        //Open Orders
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))openOrders from WG_Order_Master WHere Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0" + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const OpenOrders = result[0].openOrders;
        var openOrders = {
            heading: "Open Orders",
            value: OpenOrders,
            valueInPerc: -1,
            detailLink: `productiondashboardDetail/Open Orders/openOrders/${unitId}/${orderCategory}`,
            color: '#1b5e20'
        };
        productionDashboard.add(openOrders);
        //Late Shipments
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))lateShipments from WG_Order_Master Where Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0 AND ShipmentDate <= Convert(Date,GetDate())" + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const LateShipments = result[0].lateShipments;
        var lateShipments = {
            heading: "Late Shipments",
            value: LateShipments,
            valueInPerc: -1,
            detailLink: `productiondashboardDetail/Late Shipments/lateShipments/${unitId}/${orderCategory}`,
            color: '#dd2c00'
        };
        productionDashboard.add(lateShipments);
        //Upcomming Shipments
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))upCommingShipments from WG_Order_Master Where Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0 AND ShipmentDate > Convert(Date,GetDate())" + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UpcommingShipments = result[0].upCommingShipments;
        var upcommingShipments = {
            heading: "Upcomming Shipments",
            value: UpcommingShipments,
            valueInPerc: -1,
            detailLink: `productiondashboardDetail/Upcomming Shipments/upcommingShipments/${unitId}/${orderCategory}`,
            color: '#827717'
        };
        productionDashboard.add(upcommingShipments);
        //pending BOMs
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))pendingBOMs from WG_Order_Master WHere Order_Category=:orderCategory AND ISNULL(Order_Closed,0)=0  AND OrderID NOT In (select OrderID from Stock_BOMMaster)" + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const PendingBOMs = result[0].pendingBOMs;
        var pendingBOMs = {
            heading: "Pending BOMs",
            value: PendingBOMs,
            valueInPerc: -1,
            detailLink: `productiondashboardDetail/Pending BOMs/pendingBOMs/${unitId}/${orderCategory}`,
            color: '#ff9800'
        };
        productionDashboard.add(pendingBOMs);
        //Production Status Received Based (Order Wise)
        productionDashboard.add({
            heading: "Production Status",
            value: 0,
            valueInPerc: -1,
            subHeading: ' Order Wise',
            detailLink: `productiondashboardDetail/Production Status (Order Wise)/productionStatus/${unitId}/${orderCategory}`,
            color: '#757575'
        });
        //Production Status Received Based (Article Wise)
        productionDashboard.add({
            heading: "Production Status",
            value: 0,
            valueInPerc: -1,
            subHeading: ' Article Wise',
            detailLink: `productiondashboardDetail/Production Status (Article Wise)/productionStatusArticleWise/${unitId}/${orderCategory}`,
            color: '#607d8b'
        });
        //Production Status Received Based (Article Wise)
        productionDashboard.add({
            heading: "Production Status",
            value: 0,
            valueInPerc: -1,
            subHeading: 'Color Wise',
            detailLink: `productiondashboardDetail/Production Status (Color Wise)/productionStatusColorWise/${unitId}/${orderCategory}`,
            color: '#0091ea'
        });
        return [...productionDashboard];
    });
}
exports.dbProduction = dbProduction;
function dbProductionDetail(tag, unitId, orderCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
        const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
        let result;
        if (tag === "totalArticles") {
            result = yield db_config_1.default.query("select i.ItemID as ID,UnitName as ProductionUnit,ItemID as ArticleNo,Named as Article, c.ProductionName as Customer,i.CustItemCode  from WG_Items i left join CompanyUnit u on UnitID = ID left join Stock_Customers c on i.customerID = c.CustCode " + `${unitId === '000' ? '' : ' Where i.UnitID=:UnitID'}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === "openOrders") {
            result = yield db_config_1.default.query("select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND Order_Category=:orderCategory " + `${unitId === '000' ? '' : ' AND m.UnitID=:UnitID'}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === "lateShipments") {
            result = yield db_config_1.default.query("select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND m.ShipmentDate <= Convert(Date,GetDate())  AND Order_Category=:orderCategory " + `${unitId === '000' ? '' : ' AND m.UnitID=:UnitID'}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === "upcommingShipments") {
            result = yield db_config_1.default.query("select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND m.ShipmentDate > Convert(Date,GetDate())  AND Order_Category=:orderCategory " + `${unitId === '000' ? '' : ' AND m.UnitID=:UnitID'}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === "pendingBOMs") {
            result = yield db_config_1.default.query("select m.OrderID as ID,UnitName,c.ProductionName as  Customer,m.OrderID,Order_Date,ShipmentDate,Qty from WG_Order_Master m left join (Select OrderID,SUM(Qty)Qty from WG_Order_Detail group by OrderID )d on m.OrderID = d.OrderID left join CompanyUnit u on m.UnitID = u.ID left join Stock_Customers c on m.CustID = c.CustCode  Where ISNULL(m.Order_Closed,0)=0 AND m.OrderID NOT IN (select OrderID from Stock_BOMMaster)  AND Order_Category=:orderCategory " + `${unitId === '000' ? '' : ' AND m.UnitID=:UnitID'}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === "productionStatus") {
            result = yield db_config_1.default.query("Exec sp_PSOrderWiseRecvBased $orderCategory,$UnitID", {
                bind: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === "productionStatusArticleWise") {
            result = yield db_config_1.default.query("Exec sp_PSItemWiseRecvBased $orderCategory,$UnitID", {
                bind: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === "productionStatusColorWise") {
            result = yield db_config_1.default.query("Exec sp_PSColourWiseRecvBased $orderCategory,$UnitID", {
                bind: Object.assign(Object.assign({}, replacementObject), { orderCategory: orderCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        return result;
    });
}
exports.dbProductionDetail = dbProductionDetail;
