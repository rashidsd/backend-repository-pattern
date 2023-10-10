import { Model, DataTypes } from "sequelize";
import db from "../db.config";

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


export default Role