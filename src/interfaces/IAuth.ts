import { loginUser } from '../Entities/entities'


interface IAuth {
 login(user:loginUser):Promise<boolean>
 createToken(payLoad:object,key:any,option:object):any
 verifyToken(token:string,key:any):any
}


export default IAuth

