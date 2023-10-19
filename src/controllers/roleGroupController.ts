import { Request,Response } from "express";
import { roleGroupService } from "../DIcontainer";

const createRoleGroup = async (req: Request, res: Response) => {
  try {
    
    const roleGroup = await roleGroupService.create(req.body.GroupName);
    if (roleGroup)
      return res.send({
        status: true,
        msg: "role-group created successfully",
        data: roleGroup.toJSON(),
      });
    else return res.send({ status: false, msg: "role-group is not created" });
  } catch (error) {
    return res.send({ status: false, msg: error });
  }
};

const deletRoleGroup = async (req: Request, res: Response) => {
    try {
      const deleted = await roleGroupService.delete(Number(req.params.id));
      if (deleted>0)
        return res.send({
          status: true,
          msg: "role-group deleted successfully",
         
        });
      else return res.send({ status: false, msg: "role-group is not deleted" });
    } catch (error) {
      return res.send({ status: false, msg: error });
    }
  };

  const updateRoleGroup = async (req: Request, res: Response) => {
    try {
      const updated = await roleGroupService.update(Number(req.params.id),req.body.GroupName);
      if (updated)
        return res.send({
          status: true,
          msg: "role-group updated successfully",
         
        });
      else return res.send({ status: false, msg: "role-group could not be updated" });
    } catch (error) {
      return res.send({ status: false, msg: error });
    }
  };

  const allRoleGroup = async (req: Request, res: Response) => {
    try {
      const allRoles = await roleGroupService.all();
      if (allRoles)
        return res.send({
          status: true,
          msg: "Ok",
          data:allRoles      
        });
      else return res.send({ status: false, msg: "no role-group found" });
    } catch (error) {
      return res.send({ status: false, msg: error });
    }
  };

  
  const finByIdRoleGroup = async (req: Request, res: Response) => {
    try {
      const roleGroup = await roleGroupService.findById(Number(req.params.id));
      if (roleGroup)
        return res.send({
          status: true,
          msg: "Ok",
          data:roleGroup      
        });
      else return res.send({ status: false, msg: "no role-group found" });
    } catch (error) {
      return res.send({ status: false, msg: error });
    }
  };
  
  


export default {
    createRoleGroup,
    deletRoleGroup,
    updateRoleGroup,
    allRoleGroup,
    finByIdRoleGroup


}