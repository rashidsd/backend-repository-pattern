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
const RoleGroup_1 = __importDefault(require("../Models/RoleGroup"));
const inversify_1 = require("inversify");
const dbUtility_1 = __importDefault(require("../utilites/dbUtility"));
require("reflect-metadata");
let RoleGroupRepo = class RoleGroupRepo {
    nextID() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dbUtility_1.default.exeQuery("Select Format(ISNULL(Max(Convert(float,GroupID)),0)+1,'000')GroupID from Dashboard_RolesGroup");
            return result[0].GroupID;
        });
    }
    create(group) {
        return __awaiter(this, void 0, void 0, function* () {
            group.GroupID = yield this.nextID();
            return yield RoleGroup_1.default.create(group);
        });
    }
    update(id, gName, SrNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RoleGroup_1.default.update({ GroupName: gName, SrNo: SrNo }, {
                where: { GroupID: id }
            });
        });
    }
    delete(id) {
        return RoleGroup_1.default.destroy({ where: { GroupID: id } });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return RoleGroup_1.default.findAll();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return RoleGroup_1.default.findByPk(Number(id));
        });
    }
};
RoleGroupRepo = __decorate([
    (0, inversify_1.injectable)()
], RoleGroupRepo);
exports.default = RoleGroupRepo;
