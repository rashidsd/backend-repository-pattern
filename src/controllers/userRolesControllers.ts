import { Request,Response } from "express";
import { userRoleService } from "../DIcontainer";


const deleteRole = async(req:Request,res:Response)=> {
    try {
        const deleted = await userRoleService.delete(Number(req.params.id))
        if (deleted>0)
            return res.send({status:true,msg:'role deleted successfully!'})
        else
        return res.send({status:false,msg:'role is not deleted'})
    } catch (error) {
        return res.send({status:false,msg:error})
    }
}

const assignUserRoles = async (req: Request, res: Response) => {
    try {
      const roles = await userRoleService.getUserRoles(Number(req.params.id));
      if (roles) return res.send({ status: true, msg: "Ok", data: roles });
      else return res.send({ status: false, msg: "no role found", data: roles });
    } catch (error) {
      return res.send({ status: false, msg: error });
    }
  };

  const updateUserRoles = async (req: Request, res: Response) => {
    try {
      const userID = req.body.userId;
      const roleList = req.body.roleList;
      const response = await userRoleService.updateUserRoles(userID, roleList);
      if (response) {
        return res.send({ status: true, msg: "roles updated" });
      }else {
        return res.send({ status: false, msg: "roles not updated" });
      }
    } catch (error) {
      return res.send({ status: false, msg: error });
    }
  };

export default {
  assignUserRoles,
    deleteRole,
    updateUserRoles
}



