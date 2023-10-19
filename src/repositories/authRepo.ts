import bcrypt from 'bcrypt'
import 'reflect-metadata'
import { injectable } from 'inversify';
import { loginUser } from "../Entities/entities";
import IAuth from "../interfaces/IAuth";
import User from "../Models/User";
import jwt from 'jsonwebtoken'



@injectable()
class AuthRepo implements IAuth {
  async login(user: loginUser): Promise<boolean> {
    const found = await User.findOne({
      where: { EMail: user.email },
    });

    if (found) {
      const match = await bcrypt.compare(
        user.password,
        found.toJSON().HashPassword
      );

      if (match) return true;
      else return false;
    }
    return false;
  }

  createToken(payLoad: object, key: any, option: object): any {
    const token = jwt.sign(payLoad, key, option);
    return token;
  }

  verifyToken(token: string, key: any): any {
    var result =undefined
     jwt.verify(token, key, async function(err: any, decoded:any) {
      if (err) 
        result= err
      else {
       result= decoded
       };
    });
    return result
  }
}

export default AuthRepo