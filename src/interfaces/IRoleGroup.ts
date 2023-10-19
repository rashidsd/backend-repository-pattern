import RoleGroup from "../Models/RoleGroup";



interface IRoleGroup {
  create(gName:string):Promise<RoleGroup>
  update(id:Number,gName:string):Promise<[affectedRows:number]>
  delete(id:Number):Promise<number>
  all():Promise<RoleGroup[]>
  findById(id:number):Promise<RoleGroup | null>
  }


export default IRoleGroup