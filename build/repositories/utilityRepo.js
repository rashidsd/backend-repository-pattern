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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const dbUtility_1 = __importDefault(require("../utilites/dbUtility"));
let UtilityClass = class UtilityClass {
    getUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery("Select ID as UnitID,UnitName from CompanyUnit Where Active=1");
            return result;
        });
    }
    getUnitsWithAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery(" Select '000' as UnitID ,'All' as UnitName UNION ALL Select ID as UnitID,UnitName from CompanyUnit Where Active=1");
            return result;
        });
    }
    getStoresWithAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery(" Select 'All' as storeId ,'All' as storeName UNION ALL Select store_Name as storeId, store_Name storeName from Stock_Store Where ISNULL(isSubStore,0)=0");
            return result;
        });
    }
};
UtilityClass = __decorate([
    (0, inversify_1.injectable)()
], UtilityClass);
exports.default = UtilityClass;
