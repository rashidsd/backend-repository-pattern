"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../db.config"));
class User extends sequelize_1.Model {
}
User.init({
    UserID: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    UserName: sequelize_1.DataTypes.STRING,
    EMail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: { msg: "E-Mail is not valid" } },
    },
    ERPID: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    HashPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    CustId: {
        type: sequelize_1.DataTypes.STRING, allowNull: true
    }
}, {
    sequelize: db_config_1.default,
    modelName: "User",
    tableName: "Dashboard_Users",
    createdAt: false,
    timestamps: false,
});
exports.default = User;
