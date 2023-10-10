import { promises } from "dns";
import { eRole } from "../Entities/entities";
import Role from "../Models/Role";



interface IRole {
  create(role:eRole):Promise<Role>
  update(id:Number,groupID:string,roleName:string):Promise<Role | null>
  delete(id:Number):Promise<boolean>
  All():Promise<Role[]>
  findById(id:number):Promise<Role | null>
  RoleByQry(obj:any):Promise<Role[] |null>
 }




export default IRole