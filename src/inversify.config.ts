import {Container} from 'inversify'
import  IUser from './interfaces/IUser'
import UserRepo from './repositories/userRepo'
import DITypes from './DITypes'
import IRole from './interfaces/IRole'
import RoleRepo from './repositories/roleRepo'
import IRoleGroup from './interfaces/IRoleGroup'
import RoleGroupRepo from './repositories/roleGroupRepo'
import IUserRoles from './interfaces/IUserRoles'
import UserRolesRepo from './repositories/userRolesRepo'
import AuthRepo from './repositories/authRepo'
import IAuth from './interfaces/IAuth'
import DashboardRepo from './repositories/dashboardRepo'
import IDashboard from './interfaces/IDashboard'
import IUtility from './interfaces/IUtility'
import UtilityClass from './repositories/utilityRepo'

const DIcontainer = new Container()

DIcontainer.bind<IUser>(DITypes.IUser).to(UserRepo)
DIcontainer.bind<IRole>(DITypes.IRole).to (RoleRepo)
DIcontainer.bind<IRoleGroup>(DITypes.IRoleGroup).to (RoleGroupRepo)
DIcontainer.bind<IUserRoles>(DITypes.IUserRoles).to (UserRolesRepo)
DIcontainer.bind<IAuth>(DITypes.IAuth).to (AuthRepo)
DIcontainer.bind<IDashboard>(DITypes.IDashboard).to(DashboardRepo)
DIcontainer.bind<IUtility>(DITypes.IUtility).to (UtilityClass)

export default DIcontainer