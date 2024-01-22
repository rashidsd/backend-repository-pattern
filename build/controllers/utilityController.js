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
const getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.descr === 'companyUnits') {
            const result = yield DIcontainer_1.utilityService.getUnits();
            return res.send({ status: true, msg: "ok", data: result });
        }
        else if (req.params.descr === 'companyUnitsWithAll') {
            const result = yield DIcontainer_1.utilityService.getUnitsWithAll();
            return res.send({ status: true, msg: "ok", data: result });
        }
        else if (req.params.descr === 'storesWithAll') {
            const result = yield DIcontainer_1.utilityService.getStoresWithAll();
            return res.send({ status: true, msg: "ok", data: result });
        }
        else {
            return res.send({ status: false, msg: "not found" });
        }
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
exports.default = {
    getResult
};
