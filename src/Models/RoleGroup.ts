import { Model,DataTypes } from 'sequelize';
import db from  '../db.config'


class RoleGroup extends Model {}

RoleGroup.init({
    GroupID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    GroupName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize:db, 
    tableName: "Dashboard_RolesGroup",
    createdAt: false, 
    updatedAt: false 
 }
);


export default RoleGroup