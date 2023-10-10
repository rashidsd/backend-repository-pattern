import RoleGroup from "../Models/RoleGroup";



interface IRoleGroup {
  create(gName:string):Promise<RoleGroup>
  update(id:Number,gName:string):Promise<[affectedRows:number]>
  delete(id:Number):Promise<number>
  All():Promise<RoleGroup[]>
  findById(id:number):Promise<RoleGroup | null>
  RoleGroupByQry(obj:any):Promise<RoleGroup[] |null>
 }


export default IRoleGroup