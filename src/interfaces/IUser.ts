import { changePassword, eUser } from "../Entities/entities"
import User from "../Models/User"




interface IUser {
    nextID():Promise<string>
    create(user:eUser):Promise<User> 
    update(id: Number,ERPID:string,userName:string,custId:string):Promise<User | null>
    delete(id:Number):Promise<boolean>
    findByID(id:Number):Promise<User | null>
    findByMail(email:string):Promise<User | null>
    all(): Promise<User[]>
    plainUser():Promise<any[]>
    changePassword(info:changePassword): Promise<boolean>
   }

export default IUser