import IUser from "./interfaces/IUser";
import container from "./inversify.config";
import DITypes from "./DITypes";
import IRole from "./interfaces/IRole";
import IRoleGroup from "./interfaces/IRoleGroup";

const userService = container.get<IUser>(DITypes.IUser)
const roleService =  container.get<IRole>(DITypes.IRole)
const roleGroupService = container.get<IRoleGroup>(DITypes.IRoleGroup)


export {userService,roleService,roleGroupService}
