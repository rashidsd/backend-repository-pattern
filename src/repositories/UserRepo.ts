import bcrypt from 'bcrypt'
import User from "../Models/User";
import { eUser,changePassword } from "../Entities/entities";
import IUser from "../interfaces/IUser";
import { injectable } from "inversify";
import 'reflect-metadata'
import Utility from "../utilites/dbUtility";


@injectable()
class UserRepo implements IUser {

    async nextID(): Promise<string> {
       const result:any  =await Utility.exeQuery("Select Format(ISNULL(Max(Convert(float,UserID)),0)+1,'000')UserID from Dashboard_Users")
       return result[0].UserID
    }
   
    async findByMail(email: string): Promise<User | null> {
        return await  User.findOne({where:{EMail:email}})
    }

    
    async create(user: eUser): Promise<User>  {
       user.UserID= await this.nextID()
       const createdUser = await User.create(user)
     return createdUser
    }

    

    async update(id: Number,ERPID:string,userName:string,custId:string): Promise<User | null> {
       var user= await User.findOne({where: {UserID:id}})
        if(user) {
            user.set({
                UserName:userName,
                ERPID:ERPID,
                CustId:custId
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
    
    async all(): Promise<User[]> {
       return await User.findAll()
    }

    async plainUser():Promise<any[]> {
           return User.findAll({
            attributes:['UserID','UserName']
        })
    }

    async changePassword(info:changePassword): Promise<boolean> {
        const found = await User.findOne({
            where: { EMail: info.email },
          });
      
          if (found) {
            const match = await bcrypt.compare(
                info.password,
              found.toJSON().HashPassword
            );
      
            if (match) {
                const HashPassword =   bcrypt.hashSync(
                    info.newPassword,Number(process.env.SALT_ROUND)
                    )
                    found.set({HashPassword:HashPassword})
                    await found.save();
                    return true 
            }
          }
          return false;
    }



}

export default UserRepo