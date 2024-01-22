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
exports.dbExportDeail = exports.dbExport = void 0;
const db_config_1 = __importDefault(require("../../db.config"));
const sequelize_1 = require("sequelize");
function dbExport(unitId) {
    return __awaiter(this, void 0, void 0, function* () {
        var dashboard = new Set();
        const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
        const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
        var result;
        //Open Performa Invoices
        result = yield db_config_1.default.query("select Convert(float,ISNULL(Count(distinct m.PerformaInvoiceNo),0))openPI from Export_PerformaInvoiceMaster m left join Export_PerformaInvoiceDetail d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join WG_Items i on d.ItemID = i.ItemID Where PIStatus='Ready For Production'" +
            UID, {
            replacements: Object.assign({}, replacementObject),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const OpenPI = result[0].openPI;
        var openPI = {
            heading: "Open Performa Invoices",
            value: OpenPI,
            valueInPerc: -1,
            detailLink: `exportDashboardDetail/open Performa Invoices/openPI/${unitId}`,
            color: "#3e2723",
        };
        dashboard.add(openPI);
        //Over Date Sipments
        result = yield db_config_1.default.query("select Convert(float,ISNULL(Count(Distinct m.PerformaInvoiceNo),0))overDateShipments from Export_PerformaInvoiceMaster m left join Export_PerformaInvoiceDetail d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join WG_Items i on d.ItemID = i.ItemID Where PIStatus='Ready For Production' AND ShipmentDate <= Convert(Date,GetDate())" +
            UID, {
            replacements: Object.assign({}, replacementObject),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const OverDateShipments = result[0].overDateShipments;
        var overDateShipments = {
            heading: "Over Date Shipments",
            value: OverDateShipments,
            valueInPerc: -1,
            detailLink: `exportDashboardDetail/Over Date Shipments/overDateShipments/${unitId}`,
            color: "#dd2c00",
        };
        dashboard.add(overDateShipments);
        //upcomming Shipments in next 7 days
        result = yield db_config_1.default.query("select Convert(float,ISNULL(Count(Distinct m.PerformaInvoiceNo),0))nextSevenDays from Export_PerformaInvoiceMaster m left join Export_PerformaInvoiceDetail d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join WG_Items i on d.ItemID = i.ItemID Where PIStatus='Ready For Productions' AND ShipmentDate between DATEADD(day,-7, Convert(Date,GetDate())) AND Convert(Date,GetDate())" +
            UID, {
            replacements: Object.assign({}, replacementObject),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const NextSevenDaysShipments = result[0].nextSevenDays;
        var nextSevenDaysShipments = {
            heading: "Next Seven Days Shipments",
            value: NextSevenDaysShipments,
            valueInPerc: -1,
            detailLink: `exportDashboardDetail/Next Seven Days Shipments/nextSevenDaysShipments/${unitId}`,
            color: "#004d40",
        };
        dashboard.add(nextSevenDaysShipments);
        //In Process Performas
        result = yield db_config_1.default.query("select Convert(float,ISNULL(Count(Distinct m.PerformaInvoiceNo),0))inProcess from Export_PerformaInvoiceMaster m left join Export_PerformaInvoiceDetail d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join WG_Items i on d.ItemID = i.ItemID Where PIStatus='In Process' " +
            UID, {
            replacements: Object.assign({}, replacementObject),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const InProcessPerformas = result[0].inProcess;
        var inprocessPerformas = {
            heading: "In Process Performas",
            value: InProcessPerformas,
            valueInPerc: -1,
            detailLink: `exportDashboardDetail/In Process Performas/inprocessPerformas/${unitId}`,
            color: "#cddc39",
        };
        dashboard.add(inprocessPerformas);
        //pending payments performas
        result = yield db_config_1.default.query("select Convert(float,ISNULL(Count(*),0))pendingPayments from Export_VPerformaInvoicePaymentStatus where Balance>0", {
            replacements: Object.assign({}, replacementObject),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const PendingPaymentPerformas = result[0].pendingPayments;
        var pendingPaymentPerformas = {
            heading: "Pending Payments Performas",
            value: PendingPaymentPerformas,
            valueInPerc: -1,
            detailLink: `exportDashboardDetail/Pending payments Performas/pendingPaymentPerformas/${unitId}`,
            color: "#ff5722",
        };
        dashboard.add(pendingPaymentPerformas);
        //expected payments performas
        result = yield db_config_1.default.query("select Convert(float,(ISNULL(Count(*),0)))expectedPayments from Export_Payments where Dated > Convert(Date,GetDate()) and PaymentType ='Expected'", {
            replacements: Object.assign({}, replacementObject),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const ExpectedPaymentPerformas = result[0].expectedPayments;
        var expectedPaymentPerformas = {
            heading: "Expected Payment Performas",
            value: ExpectedPaymentPerformas,
            valueInPerc: -1,
            detailLink: `exportDashboardDetail/Expected payments Performas/expectedPaymentPerformas/${unitId}`,
            color: "#827717",
        };
        dashboard.add(expectedPaymentPerformas);
        return [...dashboard];
    });
}
exports.dbExport = dbExport;
function dbExportDeail(tag, unitId) {
    return __awaiter(this, void 0, void 0, function* () {
        const UID = unitId === "All" ? "" : " AND  UnitID=:UnitID";
        const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
        console.log(unitId);
        var result;
        if (tag === "openPI") {
            result = yield db_config_1.default.query(`select UnitName,m.PerformaInvoiceNo,m.Dated,m.ShipmentDate,c.CustName as Customer,ISNULL(d.PIQty,0)PIQty,ISNULL(o.OrderQty ,0)ProdQty,ISNULL(O.OrderID,'''')ProdOrderNo  from Export_PerformaInvoiceMaster m left join ( select UnitID,UnitName,PerformaInvoiceNo,SUM(Qty)PIQty from Export_vPerformaInvoiceDetail Group by UnitID,UnitName,PerformaInvoiceNo ) d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join (Select UnitID,od.OrderID ,od.PerformaInvoiceNo,SUM(Qty)OrderQty from WG_Order_Detail Od left join WG_Order_Master Om on od.OrderID = om.OrderID  Group by UnitID ,od.OrderID,od.PerformaInvoiceNo )o on m.PerformaInvoiceNo = o.PerformaInvoiceNo and d.UnitID = o.UnitID  left join Stock_Customers c on m.CustomerID = c.CustCode Where PIStatus='Ready For Production' ${unitId === "000" ? "" : " AND d.UnitID=:unitId"} order by PerformaInvoiceNo`, {
                replacements: { unitId: unitId },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "overDateShipments") {
            result = yield db_config_1.default.query(`select d.UnitID,UnitName,m.PerformaInvoiceNo,m.Dated,m.ShipmentDate,c.CustName as Customer,ISNULL(d.PIQty,0)PIQty,ISNULL(o.OrderQty ,0)ProdQty,ISNULL(O.OrderID,'''')ProdOrderNo,ROW_NUMBER() over (order by GetDate())ID  from Export_PerformaInvoiceMaster m left join ( select UnitID,UnitName,PerformaInvoiceNo,SUM(Qty)PIQty from Export_vPerformaInvoiceDetail Group by UnitID,UnitName,PerformaInvoiceNo ) d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join (Select UnitID,od.OrderID ,od.PerformaInvoiceNo,SUM(Qty)OrderQty from WG_Order_Detail Od left join WG_Order_Master Om on od.OrderID = om.OrderID  Group by UnitID ,od.OrderID,od.PerformaInvoiceNo )o on m.PerformaInvoiceNo = o.PerformaInvoiceNo and d.UnitID = o.UnitID  left join Stock_Customers c on m.CustomerID = c.CustCode Where PIStatus='Ready For Production' AND ShipmentDate <= Convert(Date,GetDate())  ${unitId === "000" ? "" : " AND d.UnitID=:unitId"} order by PerformaInvoiceNo `, {
                replacements: { unitId: unitId },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "nextSevenDaysShipments") {
            result = yield db_config_1.default.query(`Select d.UnitID,UnitName,m.PerformaInvoiceNo,m.Dated,m.ShipmentDate,c.CustName as Customer,ISNULL(d.PIQty,0)PIQty,ISNULL(o.OrderQty ,0)ProdQty,ISNULL(O.OrderID,'''')ProdOrderNo,ROW_NUMBER() over (order by GetDate())ID  from Export_PerformaInvoiceMaster m left join ( select UnitID,UnitName,PerformaInvoiceNo,SUM(Qty)PIQty from Export_vPerformaInvoiceDetail Group by UnitID,UnitName,PerformaInvoiceNo ) d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join (Select UnitID,od.OrderID ,od.PerformaInvoiceNo,SUM(Qty)OrderQty from WG_Order_Detail Od left join WG_Order_Master Om on od.OrderID = om.OrderID  Group by UnitID ,od.OrderID,od.PerformaInvoiceNo )o on m.PerformaInvoiceNo = o.PerformaInvoiceNo and d.UnitID = o.UnitID  left join Stock_Customers c on m.CustomerID = c.CustCode Where PIStatus='Ready For Production' AND ShipmentDate between DATEADD(day,-7, Convert(Date,GetDate())) AND Convert(Date,GetDate()) ${unitId === "000" ? "" : " AND d.UnitID=:unitId"} order by PerformaInvoiceNo `, {
                replacements: { unitId: unitId },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "inprocessPerformas") {
            result = yield db_config_1.default.query(`select d.UnitID,UnitName,m.PerformaInvoiceNo,m.Dated,m.ShipmentDate,c.CustName as Customer,ISNULL(d.PIQty,0)PIQty,ISNULL(o.OrderQty ,0)ProdQty,ISNULL(O.OrderID,'''')ProdOrderNo,ROW_NUMBER() over (order by GetDate())ID  from Export_PerformaInvoiceMaster m left join ( select UnitID,UnitName,PerformaInvoiceNo,SUM(Qty)PIQty from Export_vPerformaInvoiceDetail Group by UnitID,UnitName,PerformaInvoiceNo ) d on m.PerformaInvoiceNo = d.PerformaInvoiceNo left join (Select UnitID,od.OrderID ,od.PerformaInvoiceNo,SUM(Qty)OrderQty from WG_Order_Detail Od left join WG_Order_Master Om on od.OrderID = om.OrderID  Group by UnitID ,od.OrderID,od.PerformaInvoiceNo )o on m.PerformaInvoiceNo = o.PerformaInvoiceNo and d.UnitID = o.UnitID  left join Stock_Customers c on m.CustomerID = c.CustCode Where PIStatus='In Process'  ${unitId === "000" ? "" : " AND d.UnitID=:unitId"} order by PerformaInvoiceNo `, {
                replacements: { unitId: unitId },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "pendingPaymentPerformas") {
            result = yield db_config_1.default.query(`select PerformaInvoiceNo,Dated,CustName as Customer,MarchandiserName as Marchandiser,ShipmentDate ,PaymentTerms,TotalAmount,ForeignCurrency as Currency ,AdvanceRecv as Advance,Received,Credit,Balance,PIStatus,CommercialInvNos from Export_VPerformaInvoicePaymentStatus Where Balance>0 `, {
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "expectedPaymentPerformas") {
            result = yield db_config_1.default.query(`Select DetaIlIndex as ID,p.PerformaInvoiceNo,m.CustName as Customer,p.Dated as PaymentDate,Amount,Currency,RecvRemarks as Remarks   from Export_Payments p Left join Export_VPerformaInvoiceMaster m on p.PerformaInvoiceNo = m.PerformaInvoiceNo Where p.Dated >=Convert(Date,GetDate()) AND p.PaymentType ='Expected'`, {
                replacements: { unitId: unitId },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        return result;
    });
}
exports.dbExportDeail = dbExportDeail;
