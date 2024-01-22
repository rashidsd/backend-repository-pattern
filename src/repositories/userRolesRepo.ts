import { injectable } from "inversify";
import { eUserRole } from "../Entities/entities";
import UserRoles from "../Models/UserRoles";
import IUserRoles from "../interfaces/IUserRoles";
import 'reflect-metadata'
import db from "../db.config";
import Utility from "../utilites/dbUtility";

@injectable()
class UserRolesRepo implements IUserRoles {
  async assign(uRole: eUserRole): Promise<UserRoles> {
    return await UserRoles.create(uRole);
  }

  async delete(id: Number): Promise<number> {
    return await UserRoles.destroy({
      where: { id: id },
    });
  }

  async deleteByUserAndRole(userID: string, roleID: string): Promise<number> {
    return await UserRoles.destroy({
      where: { UseID: userID, RoleID: roleID },
    });
  }

  async getUserRoles(userId: number): Promise<any[]> {
    const result = await Utility.exeQuery(
      "Select GroupName,RoleID,RoleName,ISNULL(Assign,0)Assign From Dashboard_VUserRoles Where UserID=:UserID",
      { UserID: userId }
    );
    return result;
  }

  async isRoleAssignedToUser(roleId: number, userId: number): Promise<boolean> {
    const role = await UserRoles.findAll({
      where: { UserID: userId, RoleID: roleId },
    });
    if (role) return true;
    else return false;
  }

  async updateUserRoles(userID: string, roleList: any[]): Promise<boolean> {
    const t = await db.transaction();
    try {
      for (var i = 0; i <= roleList.length - 1; i++) {
        if (roleList[i].Assign == 0) {
          await UserRoles.destroy({
            where: { UserID: userID, RoleID: roleList[i].RoleID },
            transaction: t,
          });
        } else {
          const roleExists = await UserRoles.findOne({
            where: { UserID: userID, RoleID: roleList[i].RoleID },
            transaction: t,
          });
          if (!roleExists) {
            await UserRoles.create(
              {
                UserID: userID,
                RoleID: roleList[i].RoleID,
              },
              { transaction: t }
            );
          }
        }
      }
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      console.log(error);
      return false;
    }
  }
}

export default UserRolesRepo