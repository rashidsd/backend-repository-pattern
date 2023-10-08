import {Container} from 'inversify'
import  IUser from './interfaces/IUser'
import UserRepo from './repositories/UserRepo'
import DITypes from './DITypes'

const DIcontainer = new Container()


DIcontainer.bind<IUser>(DITypes.IUser).to(UserRepo)

export default DIcontainer