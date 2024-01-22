import { Model,DataTypes } from 'sequelize';
import db from  '../db.config'


class RoleGroup extends Model {}

RoleGroup.init({
    GroupID: {
      type: DataTypes.STRING,
      primaryKey: true,
     },
    GroupName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    SrNo:{
      type:DataTypes.NUMBER,
      allowNull:true,
      unique:true
    }
  },
  {
    sequelize:db, 
    tableName: "Dashboard_RolesGroup",
    createdAt: false, 
    updatedAt: false 
 }
);


export default RoleGroup