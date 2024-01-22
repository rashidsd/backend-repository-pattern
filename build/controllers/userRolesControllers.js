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
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield DIcontainer_1.userRoleService.delete(Number(req.params.id));
        if (deleted > 0)
            return res.send({ status: true, msg: 'role deleted successfully!' });
        else
            return res.send({ status: false, msg: 'role is not deleted' });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const assignUserRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield DIcontainer_1.userRoleService.getUserRoles(Number(req.params.id));
        if (roles)
            return res.send({ status: true, msg: "Ok", data: roles });
        else
            return res.send({ status: false, msg: "no role found", data: roles });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const updateUserRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.body.userId;
        const roleList = req.body.roleList;
        const response = yield DIcontainer_1.userRoleService.updateUserRoles(userID, roleList);
        if (response) {
            return res.send({ status: true, msg: "roles updated" });
        }
        else {
            return res.send({ status: false, msg: "roles not updated" });
        }
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
exports.default = {
    assignUserRoles,
    deleteRole,
    updateUserRoles
};
