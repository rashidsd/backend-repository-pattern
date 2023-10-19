import { eUserRole } from "../Entities/entities";
import UserRoles from "../Models/UserRoles";



interface IUserRoles {
  assign(role:eUserRole):Promise<UserRoles>
  delete(id:Number):Promise<number>
  isRoleAssignedToUser(roleId:number,userId:number):Promise<boolean>
  }

export default IUserRoles