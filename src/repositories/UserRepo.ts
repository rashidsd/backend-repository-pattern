import User from "../Models/User";
import { eUser } from "../Entities/entities";
import IUser from "../interfaces/IUser";
import { injectable } from "inversify";
import 'reflect-metadata'
import { promises } from "dns";

@injectable()
class UserRepo implements IUser {

    async create(user: eUser): Promise<User>  {
    const createdUser = await User.create(user)
     return createdUser
    }

    async update(id: Number,ERPID:string,userName:string): Promise<User | null> {
       var user= await User.findOne({where: {UserID:id}})
        if(user) {
            user.set({
                UserName:userName,
                ERPID:ERPID
            })
            await user.save()
        }
        return user
    }

    async delete(id: Number): Promise<boolean> {
        var user= await User.findOne({where: {UserID:id}})
        if (user) {
            await user.destroy()
            return true
        }else return false
    }

    async findByID(id: Number): Promise<User | null> {
       return await User.findOne({where: {UserID:id}})
    }
    
    async All(): Promise<User[]> {
       return await User.findAll()
    }

}

export default UserRepo