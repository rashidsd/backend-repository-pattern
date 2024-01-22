import RoleGroup from "../Models/RoleGroup";
import IRoleGroup from "../interfaces/IRoleGroup";
import { injectable } from "inversify";
import { eRoleGroup } from "../Entities/entities";
import Utility from "../utilites/dbUtility";
import "reflect-metadata"

@injectable()
class RoleGroupRepo implements IRoleGroup {

    async nextID(): Promise<string> {
        const result:any  =await Utility.exeQuery("Select Format(ISNULL(Max(Convert(float,GroupID)),0)+1,'000')GroupID from Dashboard_RolesGroup")
        return result[0].GroupID
    }
    
    async create(group:eRoleGroup ): Promise<RoleGroup> {
       group.GroupID = await this.nextID()
        return await RoleGroup.create(group) 
    }
    
    async update(id: Number, gName: string,SrNo:Number): Promise<[affectedRows:number]> {
        return  await RoleGroup.update({GroupName:gName,SrNo:SrNo},
            {
            where: {GroupID:id}
        })
    }

    delete(id: Number): Promise<number> {
       return RoleGroup.destroy({where:{GroupID:id}})
    }

    async all(): Promise<RoleGroup[]> {
       return RoleGroup.findAll()
    }

    async findById(id: number): Promise<RoleGroup | null> {
        return RoleGroup.findByPk(Number(id))
    }

   }

export default RoleGroupRepo