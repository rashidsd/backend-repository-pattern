"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const routesProtection_1 = __importDefault(require("../middleWares/routesProtection"));
const router = express_1.default.Router();
router.route("/")
    .post((0, routesProtection_1.default)('Manage Users'), userController_1.default.creatUser)
    .get((0, routesProtection_1.default)('Manage Users'), userController_1.default.AllUsers);
router.route("/plainUser")
    .get(userController_1.default.plainUser);
router.route("/:id")
    .get((0, routesProtection_1.default)('Manage Users'), userController_1.default.findById)
    .put((0, routesProtection_1.default)('Manage Users'), userController_1.default.updatUser)
    .delete((0, routesProtection_1.default)('Manage Users'), userController_1.default.deleteUser);
router.route("/changePassword")
    .post(userController_1.default.changePassword);
exports.default = router;
