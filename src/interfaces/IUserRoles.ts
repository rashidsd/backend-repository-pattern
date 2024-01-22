import { eUserRole } from "../Entities/entities";
import UserRoles from "../Models/UserRoles";



interface IUserRoles {
  assign(role:eUserRole):Promise<UserRoles>
  delete(id:Number):Promise<number>
  deleteByUserAndRole(userID: string,roleID:string): Promise<number>
  isRoleAssignedToUser(roleId:number,userId:number):Promise<boolean>
  getUserRoles(userId: number): Promise<UserRoles[]>;
  updateUserRoles(userID:string,roleList:any[]) : Promise<boolean>
  }

export default IUserRoles