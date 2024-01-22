import dashboardController from "../controllers/dashboardController";
import express from 'express'
import roleProtection from "../middleWares/routesProtection";

const router =  express.Router()

 router.get("/hrDashboard/:unitId/:empCategory/:dated",roleProtection('Hr Dashboard'),dashboardController.hrDashboard)
router.get("/hrDashboard/hrDashboardDetail/:heading/:tag/:unitId/:empCategory/:dated",roleProtection('Hr Dashboard'),dashboardController.hrDashboardDetail)

router.get("/productionDashboard/:unitId/:orderCategory",roleProtection('Production Dashboard'),dashboardController.productionDashboard)
router.get("/productionDashboard/productionDashboardDetail/:heading/:tag/:unitId/:orderCategory",roleProtection('Production Dashboard'),dashboardController.productionDashboardDetail)

router.get("/stockDashboard/:store/:fromDate/:toDate",roleProtection('Stock Dashboard'),dashboardController.stockDashboard)
router.get("/stockDashboard/stockDashboardDetail/monthWiseReceiving/:heading/:tag/:store/:fromDate/:toDate",roleProtection('Stock Dashboard'),dashboardController.stockReceivingMontWise)
router.get("/stockDashboard/stockDashboardDetail/:heading/:tag/:store/:fromDate/:toDate",roleProtection('Stock Dashboard'),dashboardController.stockDashboardDetail)

router.get("/accountDashboard/:dated",roleProtection('Accounts Dashboard'),dashboardController.accountDashboard)
router.get("/accountDashboard/accountDashboardDetail/:heading/:tag/:dated",roleProtection('Accounts Dashboard'),dashboardController.accountDashboardDetail)

router.get("/exportDashboard/:unitId",roleProtection('Export Dashboard'),dashboardController.exportDashboard)
router.get("/exportDashboard/exportDashboardDetail/:heading/:tag/:unitId",roleProtection('Export Dashboard'),dashboardController.exportDashboardDetail)


export default router