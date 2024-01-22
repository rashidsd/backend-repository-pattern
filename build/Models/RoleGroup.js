"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../db.config"));
class RoleGroup extends sequelize_1.Model {
}
RoleGroup.init({
    GroupID: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    GroupName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    SrNo: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
        unique: true
    }
}, {
    sequelize: db_config_1.default,
    tableName: "Dashboard_RolesGroup",
    createdAt: false,
    updatedAt: false
});
exports.default = RoleGroup;
