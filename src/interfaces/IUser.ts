import { eUser } from "../Entities/entities"
import User from "../Models/User"


interface IUser {
    create(user:eUser):Promise<User> 
    update(id: Number,ERPID:string,userName:string):Promise<User | null>
    delete(id:Number):Promise<boolean>
    findByID(id:Number):Promise<User | null>
    findByMail(email:string):Promise<User | null>
    all(): Promise<User[]>
   }

export default IUser