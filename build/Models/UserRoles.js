"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../db.config"));
const Role_1 = __importDefault(require("./Role"));
const User_1 = __importDefault(require("./User"));
class UserRoles extends sequelize_1.Model {
}
UserRoles.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "UserID"
        }
    },
    RoleID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role_1.default,
            key: "RoleID"
        }
    },
}, {
    sequelize: db_config_1.default,
    tableName: "Dashboard_UserRoles",
    createdAt: false,
    updatedAt: false
});
exports.default = UserRoles;
