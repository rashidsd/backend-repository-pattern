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
const inversify_1 = require("inversify");
const UserRoles_1 = __importDefault(require("../Models/UserRoles"));
require("reflect-metadata");
const db_config_1 = __importDefault(require("../db.config"));
const dbUtility_1 = __importDefault(require("../utilites/dbUtility"));
let UserRolesRepo = class UserRolesRepo {
    assign(uRole) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRoles_1.default.create(uRole);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRoles_1.default.destroy({
                where: { id: id },
            });
        });
    }
    deleteByUserAndRole(userID, roleID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRoles_1.default.destroy({
                where: { UseID: userID, RoleID: roleID },
            });
        });
    }
    getUserRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery("Select GroupName,RoleID,RoleName,ISNULL(Assign,0)Assign From Dashboard_VUserRoles Where UserID=:UserID", { UserID: userId });
            return result;
        });
    }
    isRoleAssignedToUser(roleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield UserRoles_1.default.findAll({
                where: { UserID: userId, RoleID: roleId },
            });
            if (role)
                return true;
            else
                return false;
        });
    }
    updateUserRoles(userID, roleList) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield db_config_1.default.transaction();
            try {
                for (var i = 0; i <= roleList.length - 1; i++) {
                    if (roleList[i].Assign == 0) {
                        yield UserRoles_1.default.destroy({
                            where: { UserID: userID, RoleID: roleList[i].RoleID },
                            transaction: t,
                        });
                    }
                    else {
                        const roleExists = yield UserRoles_1.default.findOne({
                            where: { UserID: userID, RoleID: roleList[i].RoleID },
                            transaction: t,
                        });
                        if (!roleExists) {
                            yield UserRoles_1.default.create({
                                UserID: userID,
                                RoleID: roleList[i].RoleID,
                            }, { transaction: t });
                        }
                    }
                }
                yield t.commit();
                return true;
            }
            catch (error) {
                yield t.rollback();
                console.log(error);
                return false;
            }
        });
    }
};
UserRolesRepo = __decorate([
    (0, inversify_1.injectable)()
], UserRolesRepo);
exports.default = UserRolesRepo;
