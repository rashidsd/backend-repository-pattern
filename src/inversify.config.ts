import {Container} from 'inversify'
import  IUser from './interfaces/IUser'
import UserRepo from './repositories/UserRepo'
import DITypes from './DITypes'
import IRole from './interfaces/IRole'
import RoleRepo from './repositories/RoleRepo'
import IRoleGroup from './interfaces/IRoleGroup'
import RoleGroupRepo from './repositories/RoleGroupRepo'

const DIcontainer = new Container()


DIcontainer.bind<IUser>(DITypes.IUser).to(UserRepo)
DIcontainer.bind<IRole>(DITypes.IRole).to (RoleRepo)
DIcontainer.bind<IRoleGroup>(DITypes.IRoleGroup).to (RoleGroupRepo)

export default DIcontainer