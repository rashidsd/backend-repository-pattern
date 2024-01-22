"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const RoleGroup_1 = __importDefault(require("./RoleGroup"));
const User_1 = __importDefault(require("./User"));
const db_config_1 = __importDefault(require("../db.config"));
const UserRoles_1 = __importDefault(require("./UserRoles"));
class Role extends sequelize_1.Model {
}
Role.init({
    RoleID: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    GroupID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    RoleName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_config_1.default,
    tableName: "Dashboard_Roles",
    createdAt: false,
    updatedAt: false
});
RoleGroup_1.default.hasMany(Role, { foreignKey: "GroupID" });
Role.belongsTo(RoleGroup_1.default, { foreignKey: "GroupID" });
User_1.default.belongsToMany(Role, { through: UserRoles_1.default, foreignKey: "UserID" });
Role.belongsToMany(User_1.default, { through: UserRoles_1.default, foreignKey: "RoleID" });
exports.default = Role;
