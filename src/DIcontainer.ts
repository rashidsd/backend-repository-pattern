import IUser from "./interfaces/IUser";
import container from "./inversify.config";
import DITypes from "./DITypes";

const userService = container.get<IUser>(DITypes.IUser)


export {userService}
