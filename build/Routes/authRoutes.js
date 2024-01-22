"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.route('/login')
    .post(authController_1.default.login);
router.route('/refresh')
    .post(authController_1.default.refreshTheToken);
router.route('/logout')
    .post(authController_1.default.logout);
exports.default = router;
