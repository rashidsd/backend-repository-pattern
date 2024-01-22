import { eRole } from "../Entities/entities";
import Role from "../Models/Role";
import RoleGroup from "../Models/RoleGroup";
import IRole from "../interfaces/IRole";
import UserRoles from "../Models/UserRoles";
import { injectable } from "inversify";
import "reflect-metadata"
import Utility from "../utilites/dbUtility";



@injectable()
class RoleRepo implements IRole {

  async nextID(): Promise<string> {
    const result:any  =await Utility.exeQuery("Select Format(ISNULL(Max(Convert(float,RoleID)),0)+1,'000')RoleID from Dashboard_Roles")
    return result[0].RoleID
}

  async create(role: eRole): Promise<Role> {
    role.RoleID =  await this.nextID()
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



  async roleByGroup(): Promise<any[]> {
      return await Utility.exeQuery("select RoleID,RoleName,g.GroupName from Dashboard_Roles r Left join Dashboard_RolesGroup g on r.GroupID= g.GroupID Order by g.GroupName ")
  }

  async roleByUserId(userId: number): Promise<any[]> {
    const result = await Utility.exeQuery(
      "Select GroupID,GroupName,RoleID,RoleName From Dashboard_VUserRoles Where Assign=:Assign AND UserID=:UserID",
      { UserID: userId,Assign:1 }
    );
    return result;
  }

  async roleByEMail(email: string): Promise<any[]> {
    const result = await Utility.exeQuery(
      "Select GroupID,GroupName,RoleID,RoleName From Dashboard_VUserRoles Where Assign=:Assign AND EMail=:EMail",
      { EMail: email,Assign:1 }
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
    const role = await UserRoles.findOne({
      where: { RoleID: roleId },
    });
    if (role) return true;
    else return false;
  }
    
}


export default RoleRepo