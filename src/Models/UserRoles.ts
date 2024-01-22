import { Model, DataTypes } from "sequelize";
import db from "../db.config";
import Role from "./Role";
import User from "./User";

class UserRoles extends Model {}

UserRoles.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
      },
    UserID: {
      type:DataTypes.INTEGER,
      allowNull:false,
       references: {
        model:User,
        key:"UserID"
       } 
     
    },
    RoleID: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
          model:Role,
          key:"RoleID"
        }
      },
      
  },
  {
    sequelize:db, 
    tableName: "Dashboard_UserRoles",
    createdAt: false, 
    updatedAt: false 
 }
);




export default UserRoles