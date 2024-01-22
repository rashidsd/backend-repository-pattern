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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../Models/User"));
const inversify_1 = require("inversify");
require("reflect-metadata");
const dbUtility_1 = __importDefault(require("../utilites/dbUtility"));
let UserRepo = class UserRepo {
    nextID() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery("Select Format(ISNULL(Max(Convert(float,UserID)),0)+1,'000')UserID from Dashboard_Users");
            return result[0].UserID;
        });
    }
    findByMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ where: { EMail: email } });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.UserID = yield this.nextID();
            const createdUser = yield User_1.default.create(user);
            return createdUser;
        });
    }
    update(id, ERPID, userName, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield User_1.default.findOne({ where: { UserID: id } });
            if (user) {
                user.set({
                    UserName: userName,
                    ERPID: ERPID,
                    CustId: custId
                });
                yield user.save();
            }
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield User_1.default.findOne({ where: { UserID: id } });
            if (user) {
                yield user.destroy();
                return true;
            }
            else
                return false;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ where: { UserID: id } });
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findAll();
        });
    }
    plainUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findAll({
                attributes: ['UserID', 'UserName']
            });
        });
    }
    changePassword(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield User_1.default.findOne({
                where: { EMail: info.email },
            });
            if (found) {
                const match = yield bcrypt_1.default.compare(info.password, found.toJSON().HashPassword);
                if (match) {
                    const HashPassword = bcrypt_1.default.hashSync(info.newPassword, Number(process.env.SALT_ROUND));
                    found.set({ HashPassword: HashPassword });
                    yield found.save();
                    return true;
                }
            }
            return false;
        });
    }
};
UserRepo = __decorate([
    (0, inversify_1.injectable)()
], UserRepo);
exports.default = UserRepo;
