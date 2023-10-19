import { injectable } from "inversify";
import { eUserRole } from "../Entities/entities";
import UserRoles from "../Models/UserRoles";
import IUserRoles from "../interfaces/IUserRoles";
import 'reflect-metadata'


@injectable()
class UserRolesRepo implements IUserRoles {
    async assign(uRole: eUserRole): Promise<UserRoles> {
       return await UserRoles.create(uRole)
    }
    async delete(id: Number): Promise<number> {
        return await UserRoles.destroy({
            where: {id:id}
        })
    }

    async isRoleAssignedToUser(roleId:number,userId:number):Promise<boolean> {
        const role = await UserRoles.findAll({
          where: {UserID:userId,RoleID:roleId}
        })
        if (role)
            return true
        else
            return false
      }
   
}
export default UserRolesRepo