import RoleGroup from "../Models/RoleGroup";
import { eRoleGroup } from "../Entities/entities";



interface IRoleGroup {
  nextID():Promise<string>
  create(group:eRoleGroup):Promise<RoleGroup>
  update(id:Number,gName:string,SrNo:Number):Promise<[affectedRows:number]>
  delete(id:Number):Promise<number>
  all():Promise<RoleGroup[]>
  findById(id:number):Promise<RoleGroup | null>
  }


export default IRoleGroup