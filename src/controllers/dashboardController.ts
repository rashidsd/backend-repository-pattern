import { dashboardService } from "../DIcontainer";
import { Request,Response } from "express";

const hrDashboard = async (req:Request,res:Response)=> {
    try {
        var {unitId,dated,empCategory} = req.params
        

        const result =await dashboardService.hrDashboard(unitId,empCategory,dated) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const hrDashboardDetail = async (req:Request,res:Response)=> {
    try {
        var {tag,unitId,dated,empCategory} = req.params
        

        const result =await dashboardService.hrDashboardDetail(tag,unitId,empCategory,dated) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const productionDashboard = async (req:Request,res:Response)=> {
    try {
        var {unitId,orderCategory} = req.params
        const result =await dashboardService.productionDashboard(unitId,orderCategory) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const productionDashboardDetail = async (req:Request,res:Response)=> {
    try {
        var {tag,unitId,orderCategory} = req.params
        
        const result =await dashboardService.productionDashboardDetail(tag,unitId,orderCategory) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const stockDashboard = async (req:Request,res:Response)=> {
    try {
        var {store,fromDate,toDate} = req.params
        const result =await dashboardService.stockDashboard(store,fromDate,toDate) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const stockDashboardDetail = async (req:Request,res:Response)=> {
    try {
        var {store,fromDate,toDate,tag} = req.params
        const result =await dashboardService.stockDashboardDetail(tag,store,fromDate,toDate) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const stockReceivingMontWise = async (req:Request,res:Response)=> {
    try {
        var {store,fromDate,toDate,tag} = req.params
        const result =await dashboardService.stockReceivingMonthWise(store,fromDate,toDate) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const accountDashboard = async (req:Request,res:Response)=> {
    try {
        var {dated} = req.params
        const result =await dashboardService.accountDashboard(dated) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const accountDashboardDetail = async (req:Request,res:Response)=> {
    try {
        var {tag,dated} = req.params
        const result =await dashboardService.accountDashboardDetail(tag,dated) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const exportDashboard = async (req:Request,res:Response)=> {
    try {
        var {unitId} = req.params
        const result =await dashboardService.exportDashboard(unitId) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

const exportDashboardDetail = async (req:Request,res:Response)=> {
    try {
        var {tag,unitId} = req.params
        const result =await dashboardService.exportDashboardDetail(tag,unitId) 
        return res.send({ status: true, msg: "Ok", data: result });

    } catch (error) {
        return res.send({ status: false, msg: error });
    }
}

export default {
    hrDashboard,
    hrDashboardDetail,
    productionDashboard,
    productionDashboardDetail,
    stockDashboard,
    stockDashboardDetail,
    stockReceivingMontWise,
    accountDashboard,
    accountDashboardDetail,
    exportDashboard,
    exportDashboardDetail
}
