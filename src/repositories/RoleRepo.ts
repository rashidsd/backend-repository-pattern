import { eRole } from "../Entities/entities";
import Role from "../Models/Role";
import RoleGroup from "../Models/RoleGroup";
import IRole from "../interfaces/IRole";
import { injectable } from "inversify";
import "reflect-metadata"


@injectable()
class RoleRepo implements IRole {

       async create(role: eRole): Promise<Role> {
        return await Role.create(role) 
    }

    async update(id: Number, groupID: string, roleName: string): Promise<Role | null> {
       const role = await Role.findByPk(Number(id))
       if (role) {
            role.update({
                RoleName:roleName,
                GroupID:groupID
            })
           await role.save()
       }
       return role
    }

    async delete(id: Number): Promise<boolean> {
        const role = await Role.findByPk(Number(id))
        if (role) {
            await role.destroy()
            return true
        }
        return false
    }

   async findById(id: number): Promise<Role | null> {
        const role = await Role.findByPk(Number(id))
        return role
    }

   async All(): Promise<Role[]> {
       return await Role.findAll()
   }

   async RoleByQry(obj: any): Promise<Role[] | null> {
    return await Role.findAll({...obj})
}

   


}


export default RoleRepo