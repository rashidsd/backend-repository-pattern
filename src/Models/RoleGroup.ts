import { Model,DataTypes } from 'sequelize';
import db from  '../db.config'
import Role from './Role';


class RoleGroup extends Model {}

RoleGroup.init({
    GroupID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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

RoleGroup.hasMany(Role,{foreignKey:"GroupID"});
Role.belongsTo(RoleGroup,{foreignKey:"GroupID"})



export default RoleGroup