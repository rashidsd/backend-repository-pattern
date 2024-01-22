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
Object.defineProperty(exports, "__esModule", { value: true });
const DIcontainer_1 = require("../DIcontainer");
const hrDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { unitId, dated, empCategory } = req.params;
        const result = yield DIcontainer_1.dashboardService.hrDashboard(unitId, empCategory, dated);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const hrDashboardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { tag, unitId, dated, empCategory } = req.params;
        const result = yield DIcontainer_1.dashboardService.hrDashboardDetail(tag, unitId, empCategory, dated);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const productionDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { unitId, orderCategory } = req.params;
        const result = yield DIcontainer_1.dashboardService.productionDashboard(unitId, orderCategory);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const productionDashboardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { tag, unitId, orderCategory } = req.params;
        const result = yield DIcontainer_1.dashboardService.productionDashboardDetail(tag, unitId, orderCategory);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const stockDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { store, fromDate, toDate } = req.params;
        const result = yield DIcontainer_1.dashboardService.stockDashboard(store, fromDate, toDate);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const stockDashboardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { store, fromDate, toDate, tag } = req.params;
        const result = yield DIcontainer_1.dashboardService.stockDashboardDetail(tag, store, fromDate, toDate);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const stockReceivingMontWise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { store, fromDate, toDate, tag } = req.params;
        const result = yield DIcontainer_1.dashboardService.stockReceivingMonthWise(store, fromDate, toDate);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const accountDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { dated } = req.params;
        const result = yield DIcontainer_1.dashboardService.accountDashboard(dated);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const accountDashboardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { tag, dated } = req.params;
        const result = yield DIcontainer_1.dashboardService.accountDashboardDetail(tag, dated);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const exportDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { unitId } = req.params;
        const result = yield DIcontainer_1.dashboardService.exportDashboard(unitId);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const exportDashboardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { tag, unitId } = req.params;
        const result = yield DIcontainer_1.dashboardService.exportDashboardDetail(tag, unitId);
        return res.send({ status: true, msg: "Ok", data: result });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
exports.default = {
    hrDashboard,
    hrDashboardDetail,
    productionDashboard,
    productionDashboardDetail,
    stockDashboard,
    stockDashboardDetail,
    stockReceivingMontWise,
    accountDashboard,
    accountDashboardDetail,
    exportDashboard,
    exportDashboardDetail
};
