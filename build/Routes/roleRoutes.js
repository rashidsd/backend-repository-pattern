"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = __importDefault(require("../controllers/roleController"));
const router = express_1.default.Router();
router.route('/')
    .get(roleController_1.default.allRoles)
    .post(roleController_1.default.createRole);
router.route('/:id([0-9]+)')
    .get(roleController_1.default.findById)
    .put(roleController_1.default.updateRole)
    .delete(roleController_1.default.deleteRole);
router.route('/group')
    .get(roleController_1.default.roleByGroup);
router.route('/group/:id([0-9]+)')
    .get(roleController_1.default.roleByGroupId);
router.route('/userRole/:id([0-9]+)')
    .get(roleController_1.default.roleByUserId);
exports.default = router;
