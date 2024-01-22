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
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield DIcontainer_1.roleService.create(req.body);
        if (newRole) {
            return res.send({
                status: true,
                msg: "Role created successfully!",
                data: newRole.toJSON(),
            });
        }
        else {
            return res.send({ status: false, msg: "Role is not created" });
        }
    }
    catch (err) {
        return res.send({ status: false, msg: err.errors[0].message });
    }
});
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const effCount = yield DIcontainer_1.roleService.update(Number(req.params.id), req.body.RoleName);
        return res.send({
            status: true,
            msg: ` ${effCount} role(s) update successfully`,
        });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAssigned = yield DIcontainer_1.roleService.isRoleAssigned(Number(req.params.id));
        if (isAssigned) {
            return res.send({
                status: false,
                msg: "role is assigned to user it cannot be deleted",
            });
        }
        const isDeleted = yield DIcontainer_1.roleService.delete(Number(req.params.id));
        if (isDeleted)
            return res.send({ status: true, msg: "role deleted successfully" });
        else
            return res.send({ status: false, msg: "role colud not be deleted" });
    }
    catch (err) {
        return res.send({ status: false, msg: err });
    }
});
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield DIcontainer_1.roleService.findById(Number(req.params.id));
        if (role)
            return res.send({ status: true, msg: "Ok", data: role });
        else
            return res.send({ status: false, msg: "no role found", data: role });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const allRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield DIcontainer_1.roleService.all();
        if (roles)
            return res.send({ status: true, msg: "Ok", data: roles });
        else
            return res.send({ status: false, msg: "No role exists" });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const roleByGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield DIcontainer_1.roleService.roleByGroup();
        if (roles)
            return res.send({ status: true, msg: "Ok", data: roles });
        else
            return res.send({ status: false, msg: "no role found", data: roles });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const roleByGroupId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield DIcontainer_1.roleService.roleByGroupId(Number(req.params.id));
        if (roles)
            return res.send({ status: true, msg: "Ok", data: roles });
        else
            return res.send({ status: false, msg: "no role found", data: roles });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const roleByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield DIcontainer_1.roleService.roleByUserId(Number(req.params.id));
        if (roles)
            return res.send({ status: true, msg: "Ok", data: roles });
        else
            return res.send({ status: false, msg: "no role found", data: roles });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
exports.default = {
    createRole,
    deleteRole,
    allRoles,
    updateRole,
    findById,
    roleByGroup,
    roleByGroupId,
    roleByUserId,
};
