"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRolesControllers_1 = __importDefault(require("../controllers/userRolesControllers"));
const router = express_1.default.Router();
router.route('/getRoles/:id')
    .get(userRolesControllers_1.default.assignUserRoles);
router.route('/updateRoles')
    .post(userRolesControllers_1.default.updateUserRoles);
router.route('/:id([0-9]+)')
    .delete(userRolesControllers_1.default.deleteRole);
exports.default = router;
