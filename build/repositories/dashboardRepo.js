"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const inversify_1 = require("inversify");
require("reflect-metadata");
const hrDashboard_1 = require("./dashboard Helper Functions/hrDashboard");
const productionDashboard_1 = require("./dashboard Helper Functions/productionDashboard");
const stockDashboard_1 = require("./dashboard Helper Functions/stockDashboard");
const accountDashboard_1 = require("./dashboard Helper Functions/accountDashboard");
const exportDashboard_1 = require("./dashboard Helper Functions/exportDashboard");
let DashboardRepo = class DashboardRepo {
    hrDashboard(unitId, empCategory, dated) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, hrDashboard_1.dbHR)(unitId, empCategory, dated);
        });
    }
    hrDashboardDetail(tag, unitId, empCategory, dated) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, hrDashboard_1.dbHRDetail)(tag, unitId, empCategory, dated);
        });
    }
    productionDashboard(unitId, ordeCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, productionDashboard_1.dbProduction)(unitId, ordeCategory);
        });
    }
    productionDashboardDetail(tag, unitId, orderCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, productionDashboard_1.dbProductionDetail)(tag, unitId, orderCategory);
        });
    }
    stockDashboard(store, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, stockDashboard_1.dbStock)(store, fromDate, toDate);
        });
    }
    stockDashboardDetail(tag, store, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, stockDashboard_1.dbStockDetail)(tag, store, fromDate, toDate);
        });
    }
    stockReceivingMonthWise(store, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, stockDashboard_1.dbStockReceivingMonthWise)(store, fromDate, toDate);
        });
    }
    accountDashboard(dated) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, accountDashboard_1.dbAccount)(dated);
        });
    }
    accountDashboardDetail(tag, dated) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, accountDashboard_1.dbAccountDetail)(tag, dated);
        });
    }
    exportDashboard(unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, exportDashboard_1.dbExport)(unitId);
        });
    }
    exportDashboardDetail(tag, unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, exportDashboard_1.dbExportDeail)(tag, unitId);
        });
    }
};
DashboardRepo = __decorate([
    (0, inversify_1.injectable)()
], DashboardRepo);
exports.default = DashboardRepo;
