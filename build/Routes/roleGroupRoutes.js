"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleGroupController_1 = __importDefault(require("../controllers/roleGroupController"));
const router = express_1.default.Router();
router.route('/')
    .get(roleGroupController_1.default.allRoleGroup)
    .post(roleGroupController_1.default.createRoleGroup);
router.route('/:id([0-9]+)')
    .delete(roleGroupController_1.default.deletRoleGroup)
    .put(roleGroupController_1.default.updateRoleGroup)
    .get(roleGroupController_1.default.finByIdRoleGroup);
exports.default = router;
