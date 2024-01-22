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
const roleProtection = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var token = req.cookies.token;
        token = token && token.split(" ")[1];
        if (token) {
            const decoded = yield DIcontainer_1.authService.verifyToken(token, process.env.TOKEN_KEY);
            if (decoded && decoded.user && decoded.user.roles && decoded.user.roles.includes(role))
                return next();
            else
                return res.status(422).send({ status: false, msg: "Access denied" });
        }
        else {
            return res.status(401).send({ status: false, msg: "Unauthorized" });
        }
    });
};
exports.default = roleProtection;
