import { Request,Response } from "express";
import { utilityService } from "../DIcontainer";

const getResult = async(req:Request,res:Response)=> {
   try {
   if (req.params.descr==='companyUnits') {
        const result = await utilityService.getUnits()
        return res.send({ status: true, msg: "ok", data: result });
    }else if (req.params.descr==='companyUnitsWithAll') {
        const result = await utilityService.getUnitsWithAll()
        return res.send({ status: true, msg: "ok", data: result });
    }else if (req.params.descr==='storesWithAll') {
        const result = await utilityService.getStoresWithAll()
        return res.send({ status: true, msg: "ok", data: result });
    }
    else {
        return res.send({ status: false, msg: "not found" });
    }
   } catch (error) {
    return res.send({ status: false, msg: error });
   }

}


export default {
    getResult
}