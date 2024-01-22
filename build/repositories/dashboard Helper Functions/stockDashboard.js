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
exports.dbStockReceivingMonthWise = exports.dbStockDetail = exports.dbStock = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../db.config"));
function dbStock(store, fromDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        var stockDashboard = new Set();
        const storeQry = store === "All" ? "" : " AND store=:store";
        const replacementObject = store === "All" ? {} : { store: store };
        fromDate = (0, dayjs_1.default)(new Date(fromDate)).format("YYYY-MM-DD");
        toDate = (0, dayjs_1.default)(new Date(toDate)).format("YYYY-MM-DD");
        let result;
        //Total Purchase
        result = yield db_config_1.default.query("select Round(ISNULL(SUM(NetAmount),0),0)totalPurchase from Stock_Receive_Master m left join Stock_Receive_Detail d on m.RecvNo = d.RecvNo Where Dated between :fromDate and :toDate AND m.ReceiveType<>'InternalTransfer' " + `${store === "All" ? "" : " AND d.store=:store"}`, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const TotalPurchase = result[0].totalPurchase;
        var totalPurchase = {
            heading: "Total Purchase",
            value: TotalPurchase,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/monthWiseReceiving/Total Purchase/totalPurchase/${store}/${fromDate}/${toDate}`,
            color: '#1b5e20',
        };
        stockDashboard.add(totalPurchase);
        //Total Receiving
        result = yield db_config_1.default.query("Select Round(ISNULL(SUM(NetAmount),0),0)totalReceiving from Stock_Receive_Detail d left join Stock_Receive_Master m on d.RecvNo = m.RecvNo  where m.Dated between :fromDate and :toDate and ReceiveType <>'InternalTransfer' " + `${store === "All" ? "" : " AND d.store=:store"}`, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const TotalReceiving = result[0].totalReceiving;
        var totalReceiving = {
            heading: "Total Receiving",
            value: TotalReceiving,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Total Receiving/totalReceiving/${store}/${fromDate}/${toDate}`,
            color: '#66bb6a',
        };
        stockDashboard.add(totalReceiving);
        //Total un-Approved Demands
        result = yield db_config_1.default.query("select ISNULL(Count(*),0)unApprovedDemands from Stock_DemandMaster where ISNULL(IsApproved,0)=0 AND Dated between :fromDate AND :toDate " + storeQry, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UnApprovedDemands = result[0].unApprovedDemands;
        var unApprovedDemands = {
            heading: "Un-Approved Demands",
            value: UnApprovedDemands,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Un-Approved Demands/unApprovedDemands/${store}/${fromDate}/${toDate}`,
            color: '#ff6d00',
        };
        stockDashboard.add(unApprovedDemands);
        //Total pdending Demands
        result = yield db_config_1.default.query("Select ISNULL(Count(*),0)pendingDemands from DB_VPendingDemands Where Dated between :fromDate AND :toDate" + storeQry, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const PendingDemands = result[0].pendingDemands;
        var pendingDemands = {
            heading: "Pending Demands",
            value: PendingDemands,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Pending Demands/pendingDemands/${store}/${fromDate}/${toDate}`,
            color: '#bf360c',
        };
        stockDashboard.add(pendingDemands);
        //Total unApproved POs
        result = yield db_config_1.default.query("select Convert(float,ISNULL(Count(PONo),0))unApprovedPOs from Stock_PO_Master Where Order_Date between :fromDate AND :toDate AND Internal_External<>'Services' AND  Internal_External <>  'Process' AND ISNULL(Cancel,0)=0  AND ISNULL(IsApproved,0)=0 AND Store IS NOT NULL " + storeQry, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UnApprovedPOs = result[0].unApprovedPOs;
        var unApprovedPOs = {
            heading: "Un-Approved POs",
            value: UnApprovedPOs,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Un-Approved POs/unApprovedPOs/${store}/${fromDate}/${toDate}`,
            color: '#bf360c',
        };
        stockDashboard.add(unApprovedPOs);
        //Un Received Pos
        result = yield db_config_1.default.query("select Count(distinct pono)unReceivedPos from ( Select m.Store,m.Order_Date as Dated, m.PONo,d.DemandNo,d.OrderNo, o.CustomerProdNme as Customer,d.Item_Name as Material, d.Qty,r.PONo as RecvPONo  from Stock_PO_Detail d left join Stock_PO_Master m on d.PONo=m.PONo left join WG_VOrderMaster o on d.OrderNo = o.OrderID left join Stock_Receive_Detail r on d.PONo = r.PONo AND d.DemandNo =r.DemandNo and d.OrderNo =r.OrderNo and d.Item_Code =r.Item_Code  Where m.order_Date between :fromDate AND :toDate AND m.Internal_External <>'Services' AND m.Internal_External <> 'Process' AND ISNULL(m.IsApproved,0)=1 and ISNULL(m.Cancel,0)=0 and r.PONo is null " + `${store === "All" ? "" : " AND m.store=:store"}` + ")x", {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UnReceivedPOs = result[0].unReceivedPos;
        var unReceivedPOs = {
            heading: "Un-Received POs",
            value: UnReceivedPOs,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Un-Received POs/unReceivedPOs/${store}/${fromDate}/${toDate}`,
            color: '#bf360c',
        };
        stockDashboard.add(unReceivedPOs);
        //Un Gate pass without inspection
        result = yield db_config_1.default.query("with cte as (select distinct Gate_PassNo,Store from Gate_Stock_Receiving_Detail Where LEN(ISNULL(InspNo ,''''))=0 ) Select ISNULL(Count(*),0)gatePassWithoutInspection from cte left join Gate_Stock_Receiving_Master m on cte.Gate_PassNo = m.Gate_PassNo Where Dated between :fromDate AND :toDate " + `${store === "All" ? "" : " AND cte.store=:store"}`, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const GateWithoutInspection = result[0].gatePassWithoutInspection;
        var getPassWithoutInspection = {
            heading: "Gate pass without inspection",
            value: GateWithoutInspection,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Gate Pass Without Inspection/gatePassWithoutInspection/${store}/${fromDate}/${toDate}`,
            color: '#455a64',
        };
        stockDashboard.add(getPassWithoutInspection);
        //Un Received Inspection
        result = yield db_config_1.default.query("With cte as (select Distinct Store,Dated,Gate_PassNo,InspNo ,VendorCode ,VendorName from Gate_Stock_VReceiving Where LEN(ISNULL(InspNo,''''))>0 AND LEN(ISNULL(RTrim(Ltrim(ReceiveNo)),''''))=0 ) Select Convert(float,ISNULL(Count(*),0))unReceivedInspection from cte Where Dated between :fromDate AND :toDate " + storeQry, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UnReceivedInspections = result[0].unReceivedInspection;
        var unReceivedInspections = {
            heading: "Un-Received Inspections",
            value: UnReceivedInspections,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Un-Received Inspection/unReceivedInspection/${store}/${fromDate}/${toDate}`,
            color: '#bf360c',
        };
        stockDashboard.add(unReceivedInspections);
        //Un Close Receiving
        result = yield db_config_1.default.query("Select Convert(float,Count(RecvNo))unCloseReceiving from Stock_Receive_Master Where Dated between :fromDate AND :toDate AND  RecvNo In (select RecvNo  from Stock_Receive_Detail Where LEN(ISNULL(CloseNo,''''))=0) AND ReceiveType<>'InternalTransfer' " + storeQry, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UnCloseReceiving = result[0].unCloseReceiving;
        var unCloseReceiving = {
            heading: "Un-Close Receiving",
            value: UnCloseReceiving,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Un-Close Receiving/unCloseReceiving/${store}/${fromDate}/${toDate}`,
            color: '#bf360c',
        };
        stockDashboard.add(unCloseReceiving);
        //Un Posted Bills
        result = yield db_config_1.default.query("Select Convert(float,Count(ClearanceNo))unpostedBills from Stock_PO_Clearance_Master Where ISNULL(IsPosted,0)=0 AND Dated between :fromDate AND :toDate" + storeQry, {
            replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UnPostedBills = result[0].unpostedBills;
        var unPostedBills = {
            heading: "Un-Posted Bills",
            value: UnPostedBills,
            valueInPerc: -1,
            detailLink: `stockdashboardDetail/Un-Posted Bills/unPostedBills/${store}/${fromDate}/${toDate}`,
            color: '#bf360c',
        };
        stockDashboard.add(unPostedBills);
        return [...stockDashboard];
    });
}
exports.dbStock = dbStock;
function dbStockDetail(tag, store, fromDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeQry = store === "All" ? "" : " AND store=:store";
        const replacementObject = store === "All" ? {} : { store: store };
        fromDate = (0, dayjs_1.default)(new Date(fromDate)).format("YYYY-MM-DD");
        toDate = (0, dayjs_1.default)(new Date(toDate)).format("YYYY-MM-DD");
        let result;
        if (tag === "totalPurchase") {
            result = yield db_config_1.default.query("Select x.VendorCode as ID,x.Store,x.VendorCode as Code,VendorName as Vendor,Internal_External as Category ,Amount from ( Select store,VendorCode,Internal_External,Round(ISNULL(SUM(Amount),0),0)Amount from ( Select d.Store,VendorCode,Internal_External,ISNULL(d.NetAmount,0)Amount from Stock_PO_Master m left join Stock_PO_Detail d on m.PONo = d.PONo Where Internal_External <>'Services' AND Order_Date between :fromDate AND :toDate AND ISNULL(isApproved,0)=1 AND ISNULL(Cancel,0)=0 )PO group by Store,VendorCode,Internal_External )x left join Stock_Vendors v on x.VendorCode = v.VendorCode " +
                `${store === "All" ? "" : " AND x.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "totalReceiving") {
            result = yield db_config_1.default.query(`Select x.VendorCode as ID,x.Store,x.VendorCode as Code,VendorName as Vendor,ReceiveType as Category ,Amount from ( Select store,VendorCode,ReceiveType,Round(ISNULL(SUM(Amount),0),0)Amount from ( Select d.Store,VendorCode,ReceiveType,ISNULL(d.NetAmount,0)Amount from Stock_Receive_Master  m left join Stock_Receive_Detail d on m.RecvNo = d.RecvNo Where ReceiveType <>'InternalTransfer' AND Dated between :fromDate AND :toDate ${store === "All" ? "" : " AND d.store=:store"})recv group by Store,VendorCode,ReceiveType )x left join Stock_Vendors v on x.VendorCode = v.VendorCode`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "unApprovedDemands") {
            result = yield db_config_1.default.query("select d.DetailIndex as ID,m.Store,Dated,m.DemandNo,OrderNo,o.CustomerProdNme as Customer,Item_Name as Material,Qty from Stock_DemandMaster m left join Stock_DemandDetail d on m.DemandNo = d.DemandNo left join WG_VOrderMaster o on d.OrderNo = o.OrderID where ISNULL(IsApproved,0)=0 AND Dated between :fromDate AND :toDate and ISNULL(d.IsCleared,0)=0 AND ISNULL(d.DemandAlreadyMadeAgainstStock,0)=0 " +
                `${store === "All" ? "" : " AND m.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "pendingDemands") {
            result = yield db_config_1.default.query("select ROW_NUMBER() over (order by GetDate())ID,Store,Dated,DemandNo ,OrderNo,Customer,item_name as Material,Qty  from DB_VPendingDemands Where Dated between :fromDate AND :toDate " + storeQry, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "unApprovedPOs") {
            result = yield db_config_1.default.query("select d.Detailindex as ID,m.Store,m.Order_Date as Dated,m.PONo,DemandNo,d.OrderNo, o.CustomerProdNme as Customer,d.Item_Name as Material,d.Qty  from Stock_PO_Master m left join Stock_PO_Detail d on m.PONo =d.PONo left join WG_VOrderMaster o on d.OrderNo = o.OrderID  Where m.Order_Date between :fromDate AND :toDate AND Internal_External<>'Services' AND Internal_External <>'Process' AND ISNULL(Cancel,0)=0 and ISNULL(isApproved,0)=0 " + `${store === "All" ? "" : " AND m.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "unReceivedPOs") {
            result = yield db_config_1.default.query("Select d.DetailIndex as ID,m.Store,m.Order_Date as Dated, m.PONo,d.DemandNo,d.OrderNo, o.CustomerProdNme as Customer,d.Item_Name as Material, d.Qty from Stock_PO_Detail d left join Stock_PO_Master m on d.PONo=m.PONo left join WG_VOrderMaster o on d.OrderNo = o.OrderID left join Stock_Receive_Detail r on d.PONo = r.PONo AND d.DemandNo =r.DemandNo and d.OrderNo =r.OrderNo and d.Item_Code =r.Item_Code  Where m.order_Date between :fromDate AND :toDate AND m.Internal_External <>'Services' AND m.Internal_External <>'Process' AND ISNULL(m.IsApproved,0)=1 and ISNULL(m.Cancel,0)=0 and r.PONo is null " + `${store === "All" ? "" : " AND d.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "gatePassWithoutInspection") {
            result = yield db_config_1.default.query("Select d.DetailIndex as ID,d.Store,Dated,d.Gate_PassNo,d.PONo,d.OrderNo ,Item_Name as Material,Qty from Gate_Stock_Receiving_Detail d left join Gate_Stock_Receiving_Master m on d.Gate_PassNo =m.Gate_PassNo Where LEN(ISNULL(d.InspNo,''''))=0 and m.Dated between :fromDate and :toDate " + `${store === "All" ? "" : " AND d.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "unReceivedInspection") {
            result = yield db_config_1.default.query(" Select d.DetailIndex as ID,d.Store,Dated,d.Gate_PassNo,d.OrderNo,o.CustomerProdNme as Customer,Item_Name as Material,Qty  from Gate_Stock_Receiving_Master m left join Gate_Stock_Receiving_Detail d on m.Gate_PassNo =d.Gate_PassNo left join WG_VOrderMaster o on d.OrderNo = o.OrderID   where Dated between :fromDate and :toDate and LEN(ISNULL(InspNo,''''))>0 and LEN(RTRIM(LTRIM(ISNULL(d.ReceiveNo,''''))))>0   " + `${store === "All" ? "" : " AND d.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "unCloseReceiving") {
            result = yield db_config_1.default.query(" Select Row_Number() over (order by GetDate())ID,d.Store,  Dated, d.RecvNo,d.OrderNo,VendorName as Vendor,Item_Name as Material,Qty from Stock_Receive_Master m Left join Stock_Receive_Detail d on m.RecvNo = d.recvNo   left join Stock_Vendors v on m.VendorCode = v.VendorCode  Where  Dated between :fromDate AND :toDate AND m.ReceiveType <> 'InternalTransfer' and LEN(ISNULL(d.CloseNo,''''))=0 " + `${store === "All" ? "" : " AND d.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "unPostedBills") {
            result = yield db_config_1.default.query(" Select d.DetailIndex as ID,d.Store,Dated,d.ClearanceNo,ClearanceType,VendorName as Vendor ,d.PONo,Qty,Rate,ROUND(ISNULL(Amount,0),0)Amount from Stock_PO_Clearance_Detail d left join Stock_PO_Clearance_Master m on d.ClearanceNo = m.ClearanceNo Left join Stock_Vendors v on m.VendorCode = v.VendorCode Where Dated between :fromDate AND :toDate and ISNULL(isPosted,0)=0" + `${store === "All" ? "" : " AND d.store=:store"}`, {
                replacements: Object.assign(Object.assign({}, replacementObject), { fromDate: fromDate, toDate: toDate, store: store }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        return result;
    });
}
exports.dbStockDetail = dbStockDetail;
function dbStockReceivingMonthWise(store, fromDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_config_1.default.query("Select period,Stock,Import,Asset,General,Process from fn_MonthWiseStockReceiving(:fromDate,:toDate,:store) order by y,m ", {
            replacements: {
                fromDate: fromDate,
                toDate: toDate,
                store: store,
            },
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    });
}
exports.dbStockReceivingMonthWise = dbStockReceivingMonthWise;
