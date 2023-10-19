import { Request, Response } from "express";
import { roleService } from "../DIcontainer";

const createRole = async (req: Request, res: Response) => {
  try {
    const newRole = await roleService.create(req.body);
    if (newRole) {
      return res.send({
        status: true,
        msg: "Role created successfully!",
        data: newRole.toJSON(),
      });
    } else {
      return res.send({ status: false, msg: "Role is not created" });
    }
  } catch (err: any) {
    return res.send({ status: false, msg: err.errors[0].message });
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    const effCount = await roleService.update(
      Number(req.params.id),
      req.body.RoleName
    );
    return res.send({
      status: true,
      msg: ` ${effCount} role(s) update successfully`,
    });
  } catch (error) {
    return res.send({ status: false, msg: error });
  }
};

const deleteRole = async (req: Request, res: Response) => {
  try {
    const isAssigned = await roleService.isRoleAssigned(Number(req.params.id))
     
    if (isAssigned) {
      return res.send({
        status: false,
        msg: "role is assigned to user it cannot be deleted",
      });
    }

    const isDeleted = await roleService.delete(Number(req.params.id));
    if (isDeleted)
      return res.send({ status: true, msg: "role deleted successfully" });
    else return res.send({ status: false, msg: "role colud not be deleted" });
  } catch (err) {
    return res.send({ status: false, msg: err });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const role = await roleService.findById(Number(req.params.id));
    if (role) return res.send({ status: true, msg: "Ok", data: role });
    else return res.send({ status: false, msg: "no role found", data: role });
  } catch (error) {
    return res.send({ status: false, msg: error });
  }
};

const allRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.all();
    if (roles) return res.send({ status: true, msg: "Ok", data: roles });
    else return res.send({ status: false, msg: "No role exists" });
  } catch (error: any) {
    return res.send({ status: false, msg: error });
  }
};

const roleByGroup = async (req:Request,res:Response)=> {
try {
  const roles = await roleService.roleByGroup()
  if (roles) 
    return res.send({ status: true, msg: "Ok", data: roles });
  else
     return res.send({ status: false, msg: "no role found", data: roles });
} catch (error) {
  return res.send({ status: false, msg: error });
}
}


const roleByGroupId = async(req:Request,res:Response)=> {
  try {
    const roles = await roleService.roleByGroupId(Number(req.params.id))
  if (roles) 
        return res.send({ status: true, msg: "Ok", data: roles });
  else
    return res.send({ status: false, msg: "no role found", data: roles });
  } catch (error) {
    return res.send({ status: false, msg: error });
  }

}


const roleByUserId = async(req:Request,res:Response)=> {
  try {
    const roles = await roleService.roleByUserId(Number(req.params.id))
  if (roles) 
        return res.send({ status: true, msg: "Ok", data: roles });
  else
    return res.send({ status: false, msg: "no role found", data: roles });
  } catch (error) {
    return res.send({ status: false, msg: error });
  }

}


export default {
  createRole,
  deleteRole,
  allRoles,
  updateRole,
  findById,
  roleByGroup,
  roleByGroupId,
  roleByUserId,
};
