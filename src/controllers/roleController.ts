import { Request,Response } from "express";
import { roleService } from "../DIcontainer";

const createRole =  async(req:Request,res:Response)=> {
try {
    const newRole = await roleService.create(req.body)
    if (newRole) {
        return res.send({status:true,msg:'Role created successfully!',data:newRole})
    }else {
        return res.send({status:false,msg:'Role is not created'})
    }
    
} catch (err:any) {
    return res.send({ status: false, msg: err.errors[0].message });
}
}

const allRoles = async (req:Request,res:Response) => {
    try {
        const roles =  await roleService.All()
        if (roles)
            return res.send({status:true,msg:'Ok',data:roles})
        else
        return res.send({status:false,msg:'No role exists'})
    } catch (err:any) {
        return res.send({ status: false, msg: err.errors[0].message });
    }
}



export default {createRole,allRoles}