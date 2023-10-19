import { Model,DataTypes } from "sequelize";
import db from '../db.config'


class User extends Model {}

User.init(
  {
    UserID: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserName: DataTypes.STRING,
    EMail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: "E-Mail is not valid" } },
    },
    ERPID: { type: DataTypes.STRING, allowNull: false },
    HashPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "Dashboard_Users",
    createdAt: false,
    timestamps: false,
  }
);



   export default User