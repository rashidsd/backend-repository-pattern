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
const DIcontainer_1 = require("../DIcontainer");
const bcrypt_1 = __importDefault(require("bcrypt"));
const creatUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserExists = yield DIcontainer_1.userService.findByMail(req.body.EMail);
        if (isUserExists) {
            return res.send({
                status: false,
                msg: `${req.body.EMail} already exists `,
            });
        }
        req.body.HashPassword = bcrypt_1.default.hashSync(req.body.HashPassword, Number(process.env.SALT_ROUND));
        const newUser = yield DIcontainer_1.userService.create(req.body);
        if (newUser) {
            return res.send({
                status: true,
                msg: "User created successfully",
                data: newUser.toJSON(),
            });
        }
        else {
            return res.send({ status: false, msg: "user could not be created" });
        }
    }
    catch (err) {
        return res.send({ status: false, msg: err.errors[0].message });
    }
});
const AllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield DIcontainer_1.userService.all();
        if (allUser) {
            return res.send({ status: true, msg: "OK", data: allUser });
        }
        else {
            return res.send({ status: false, msg: "No user exists" });
        }
    }
    catch (err) {
        return res.send({ status: false, msg: err });
    }
});
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield DIcontainer_1.userService.findByID(Number(req.params.id));
        if (user)
            return res.send({ status: true, msg: "OK", data: user });
        else
            return res.send({
                status: true,
                msg: "user does not exists",
            });
    }
    catch (err) {
        return res.send({ status: false, msg: err });
    }
});
const updatUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield DIcontainer_1.userService.update(Number(req.params.id), req.body.ERPID, req.body.UserName, req.body.CustId);
        if (user)
            return res.send({
                status: true,
                msg: "user updated successfully",
                data: user,
            });
        else
            return res.send({
                status: false,
                msg: "user cannot be updated",
            });
    }
    catch (err) {
        return res.send({ status: false, msg: err });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield DIcontainer_1.userService.delete(Number(req.params.id));
        if (deleted)
            return res.send({ status: true, msg: "user deleted successfully" });
        else
            return res.send({ status: false, msg: "user does not exists" });
    }
    catch (err) {
        return res.send({ status: false, msg: err });
    }
});
const plainUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield DIcontainer_1.userService.plainUser();
        if (response) {
            return res.send({ status: true, msg: "ok", data: response });
        }
        else {
            return res.send({ status: false, msg: "no user exists" });
        }
    }
    catch (err) {
        return res.send({ status: false, msg: err });
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const changed = yield DIcontainer_1.userService.changePassword(req.body);
        if (changed) {
            return res.send({ status: true, msg: "password changed successfully!" });
        }
        else {
            return res.send({ status: false, msg: "invalid email or passsword" });
        }
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
exports.default = {
    creatUser,
    AllUsers,
    findById,
    updatUser,
    deleteUser,
    plainUser,
    changePassword,
};
