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
const Role_1 = __importDefault(require("../Models/Role"));
const RoleGroup_1 = __importDefault(require("../Models/RoleGroup"));
const UserRoles_1 = __importDefault(require("../Models/UserRoles"));
const inversify_1 = require("inversify");
require("reflect-metadata");
const dbUtility_1 = __importDefault(require("../utilites/dbUtility"));
let RoleRepo = class RoleRepo {
    nextID() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery("Select Format(ISNULL(Max(Convert(float,RoleID)),0)+1,'000')RoleID from Dashboard_Roles");
            return result[0].RoleID;
        });
    }
    create(role) {
        return __awaiter(this, void 0, void 0, function* () {
            role.RoleID = yield this.nextID();
            return yield Role_1.default.create(role);
        });
    }
    update(id, roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Role_1.default.update({ RoleName: roleName }, {
                where: { RoleID: id },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield Role_1.default.findByPk(Number(id));
            if (role) {
                yield role.destroy();
                return true;
            }
            return false;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield Role_1.default.findByPk(Number(id));
            return role;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Role_1.default.findAll();
        });
    }
    roleByGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dbUtility_1.default.exeQuery("select RoleID,RoleName,g.GroupName from Dashboard_Roles r Left join Dashboard_RolesGroup g on r.GroupID= g.GroupID Order by g.GroupName ");
        });
    }
    roleByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery("Select GroupID,GroupName,RoleID,RoleName From Dashboard_VUserRoles Where Assign=:Assign AND UserID=:UserID", { UserID: userId, Assign: 1 });
            return result;
        });
    }
    roleByEMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery("Select GroupID,GroupName,RoleID,RoleName From Dashboard_VUserRoles Where Assign=:Assign AND EMail=:EMail", { EMail: email, Assign: 1 });
            return result;
        });
    }
    roleByGroupId(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Role_1.default.findAll({
                include: { model: RoleGroup_1.default, attributes: ["GroupName"] },
                where: { GroupID: groupId },
            });
        });
    }
    isRoleAssigned(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield UserRoles_1.default.findOne({
                where: { RoleID: roleId },
            });
            if (role)
                return true;
            else
                return false;
        });
    }
};
RoleRepo = __decorate([
    (0, inversify_1.injectable)()
], RoleRepo);
exports.default = RoleRepo;
