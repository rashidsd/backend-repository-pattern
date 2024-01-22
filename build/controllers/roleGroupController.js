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
const createRoleGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleGroup = yield DIcontainer_1.roleGroupService.create(req.body);
        if (roleGroup)
            return res.send({
                status: true,
                msg: "role-group created successfully",
                data: roleGroup.toJSON(),
            });
        else
            return res.send({ status: false, msg: "role-group is not created" });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const deletRoleGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield DIcontainer_1.roleGroupService.delete(Number(req.params.id));
        if (deleted > 0)
            return res.send({
                status: true,
                msg: "role-group deleted successfully",
            });
        else
            return res.send({ status: false, msg: "role-group is not deleted" });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const updateRoleGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield DIcontainer_1.roleGroupService.update(Number(req.params.id), req.body.GroupName, Number(req.body.SrNo));
        if (updated)
            return res.send({
                status: true,
                msg: "role-group updated successfully",
            });
        else
            return res.send({ status: false, msg: "role-group could not be updated" });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const allRoleGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRoles = yield DIcontainer_1.roleGroupService.all();
        if (allRoles)
            return res.send({
                status: true,
                msg: "Ok",
                data: allRoles
            });
        else
            return res.send({ status: false, msg: "no role-group found" });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const finByIdRoleGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleGroup = yield DIcontainer_1.roleGroupService.findById(Number(req.params.id));
        if (roleGroup)
            return res.send({
                status: true,
                msg: "Ok",
                data: roleGroup
            });
        else
            return res.send({ status: false, msg: "no role-group found" });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
exports.default = {
    createRoleGroup,
    deletRoleGroup,
    updateRoleGroup,
    allRoleGroup,
    finByIdRoleGroup
};
