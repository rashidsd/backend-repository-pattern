import RoleGroup from "../Models/RoleGroup";
import IRoleGroup from "../interfaces/IRoleGroup";
import { injectable } from "inversify";
import "reflect-metadata"

@injectable()
class RoleGroupRepo implements IRoleGroup {
    
    async create(gName: string): Promise<RoleGroup> {
        return await RoleGroup.create({GroupName:gName}) 
    }
    
    async update(id: Number, gName: string): Promise<[affectedRows:number]> {
        return  await RoleGroup.update({GroupName:gName},
            {
            where: {GroupID:id}
        })
    }

    delete(id: Number): Promise<number> {
       return RoleGroup.destroy({where:{GroupID:id}})
    }

    async All(): Promise<RoleGroup[]> {
       return RoleGroup.findAll()
    }

    async findById(id: number): Promise<RoleGroup | null> {
        return RoleGroup.findByPk(Number(id))
    }

    RoleGroupByQry(obj: any): Promise<RoleGroup[] | null> {
        return RoleGroup.findAll({...obj})
    }

}

export default RoleGroupRepo