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
const dbUtility_1 = __importDefault(require("../utilites/dbUtility"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authenticate = yield DIcontainer_1.authService.login(req.body);
        if (!authenticate)
            return res.send({ status: false, msg: "invalid email or password" });
        const currUser = (_a = (yield DIcontainer_1.userService.findByMail(req.body.email))) === null || _a === void 0 ? void 0 : _a.toJSON();
        const userRoles = yield DIcontainer_1.roleService.roleByUserId(currUser.UserID);
        const roles = userRoles.map((r) => r.RoleName);
        const token = DIcontainer_1.authService.createToken({
            user: { email: req.body.email, roles: roles }
        }, process.env.TOKEN_KEY, { expiresIn: '4h' });
        const refreshToken = DIcontainer_1.authService.createToken({
            user: { email: req.body.email, roles: roles }
        }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '24h' });
        res.cookie("token", `bearer ${token}`, { httpOnly: true });
        res.cookie("refreshToken", `${refreshToken}`, { httpOnly: true });
        const result = yield dbUtility_1.default.exeQuery("Select Company_Name as name,Company_logo as logo from Company");
        const companyInfo = Object.values(result[0]);
        const b64 = Buffer.from(companyInfo[1]).toString('base64');
        const logo = `data:image/jpeg;base64,${b64}`;
        return res.send({
            status: true,
            msg: "ok",
            data: {
                user: { name: currUser.UserName, email: currUser.EMail, erpId: currUser.ERPID, custId: currUser.custId },
                roles: userRoles,
                company: { name: companyInfo[0], logo: logo }
            },
        });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("token", "", { expires: new Date(Date.now() - 60 * 1000) });
        res.cookie("refreshToken", "", {
            expires: new Date(Date.now() - 60 * 1000),
        });
        return res.send({ status: true, msg: "Ok" });
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
});
const refreshTheToken = (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = DIcontainer_1.authService.verifyToken(refreshToken, process.env.REFRESH_TOKEN_KEY);
            if (decoded.user) {
                const token = DIcontainer_1.authService.createToken({
                    user: { email: decoded.user.email, roles: decoded.user.roles },
                }, process.env.TOKEN_KEY, { expiresIn: "4h" });
                res.cookie("token", `bearer ${token}`, { httpOnly: true });
                return res.send({ status: true, msg: "token refreshed" });
            }
            else {
                return res.send({ status: false, msg: "Unauthorized" });
            }
        }
        else {
            return res.send({ status: false, msg: "Unauthorized" });
        }
    }
    catch (error) {
        return res.send({ status: false, msg: error });
    }
};
exports.default = {
    login,
    logout,
    refreshTheToken
};
