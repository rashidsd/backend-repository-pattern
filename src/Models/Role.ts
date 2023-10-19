import { Model, DataTypes } from "sequelize";
import RoleGroup from "./RoleGroup";
import User from "./User";
import db from "../db.config";
import UserRoles from "./UserRoles";

class Role extends Model {}

Role.init({
    RoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
      },
    GroupID: {
      type:DataTypes.INTEGER,
      allowNull:false,
     
    },
    RoleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize:db, 
    tableName: "Dashboard_Roles",
    createdAt: false, 
    updatedAt: false 
 }
);

RoleGroup.hasMany(Role,{foreignKey:"GroupID"});
Role.belongsTo(RoleGroup,{foreignKey:"GroupID"})

User.belongsToMany(Role,{through:UserRoles,foreignKey:"UserID"})
Role.belongsToMany(User,{through:UserRoles,foreignKey:"RoleID"})




export default Role