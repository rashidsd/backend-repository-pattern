import { eRole } from "../Entities/entities";
import Role from "../Models/Role";
import RoleGroup from "../Models/RoleGroup";
import IRole from "../interfaces/IRole";
import UserRoles from "../Models/UserRoles";
import { injectable } from "inversify";
import "reflect-metadata"
import db from "../db.config";
import { QueryTypes } from "sequelize";



@injectable()
class RoleRepo implements IRole {
  async create(role: eRole): Promise<Role> {
    return await Role.create(role);
  }

  async update(id: Number, roleName: string): Promise<[affectedRows: number]> {
    return await Role.update(
      { RoleName: roleName },
      {
        where: { RoleID: id },
      }
    );
  }

  async delete(id: Number): Promise<boolean> {
    const role = await Role.findByPk(Number(id));
    if (role) {
      await role.destroy();
      return true;
    }
    return false;
  }

  async findById(id: number): Promise<Role | null> {
    const role = await Role.findByPk(Number(id));
    return role;
  }

  async all(): Promise<Role[]> {
    return await Role.findAll();
  }

  async roleByGroup(): Promise<Role[]> {
    return await Role.findAll({
      include: { model: RoleGroup, attributes: ["GroupName"] },
    });
  }
  async roleByUserId(userId: number): Promise<any[]> {
    const result = await db.query(
      "Select r.GroupID,GroupName,ur.RoleID,RoleName from Dashboard_Users u Left join Dashboard_UserRoles ur on u.UserID = ur.UserID left join Dashboard_Roles r on ur.RoleID = r.RoleID left join Dashboard_RolesGroup rg on r.GroupID=rg.GroupID Where u.UserID=:UserID",
      {
        replacements: { UserID: userId },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }
  async roleByGroupId(groupId: number): Promise<Role[]> {
    return await Role.findAll({
      include: { model: RoleGroup, attributes: ["GroupName"] },
      where: { GroupID: groupId },
    });
  }

  async isRoleAssigned(roleId: number): Promise<boolean> {
    const role = await UserRoles.findAll({
      where: { RoleID: roleId },
    });
    if (role) return true;
    else return false;
  }

    
}


export default RoleRepo