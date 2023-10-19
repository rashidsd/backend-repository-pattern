import { Request,Response } from "express";
import { userRoleService } from "../DIcontainer";


const assignRole = async(req:Request,res:Response)=> {
    try {
        const isRoleAssigned = await userRoleService.isRoleAssignedToUser(req.body.RoleID,req.body.UserID)
        if (isRoleAssigned) 
            return res.send({status:true,msg:'role is already assigned'}) 
        
        const userRole = await userRoleService.assign(req.body)
        if (userRole)
            return res.send({status:true,msg:'role assigned successfully!',data:userRole})
        else
        return res.send({status:false,msg:'role is not assigned'})
    } catch (error) {
        return res.send({status:false,msg:error})
    }
}

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

export default {
    assignRole,
    deleteRole
}



