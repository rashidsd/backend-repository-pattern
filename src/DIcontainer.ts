import IUser from "./interfaces/IUser";
import container from "./inversify.config";
import DITypes from "./DITypes";
import IRole from "./interfaces/IRole";
import IRoleGroup from "./interfaces/IRoleGroup";
import IUserRoles from "./interfaces/IUserRoles";
import IAuth from "./interfaces/IAuth";
import IDashboard from "./interfaces/IDashboard";
import IUtility from "./interfaces/IUtility";



const userService = container.get<IUser>(DITypes.IUser)
const roleService =  container.get<IRole>(DITypes.IRole)
const roleGroupService = container.get<IRoleGroup>(DITypes.IRoleGroup)
const userRoleService = container.get<IUserRoles>(DITypes.IUserRoles)
const authService = container.get<IAuth>(DITypes.IAuth)
const dashboardService =  container.get<IDashboard>(DITypes.IDashboard)
const utilityService =  container.get<IUtility>(DITypes.IUtility)


export {userService,
    roleService,
    roleGroupService,
    userRoleService,
    authService,
    dashboardService,
    utilityService
}
