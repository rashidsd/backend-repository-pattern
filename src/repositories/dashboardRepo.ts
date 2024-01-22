import { injectable } from "inversify";
import 'reflect-metadata'
import IDashboard from "../interfaces/IDashboard";
import { dashboardTile } from "../Entities/entities";
import { dbHR,dbHRDetail } from "./dashboard Helper Functions/hrDashboard";
import { dbProduction,dbProductionDetail } from "./dashboard Helper Functions/productionDashboard";
import { dbStock,dbStockDetail,dbStockReceivingMonthWise } from "./dashboard Helper Functions/stockDashboard";
import { dbAccount,dbAccountDetail } from "./dashboard Helper Functions/accountDashboard";
import { dbExport,dbExportDeail } from "./dashboard Helper Functions/exportDashboard";


@injectable()
class DashboardRepo implements IDashboard {
  
  
  
  
        async hrDashboard(unitId:string,empCategory:string,dated:string): Promise<dashboardTile[]> {
     return await dbHR(unitId,empCategory,dated)
   }
     async hrDashboardDetail(tag: string, unitId: string, empCategory: string, dated: string): Promise<any[]> {
    return await dbHRDetail(tag, unitId, empCategory, dated)
   }

   async productionDashboard(unitId: string, ordeCategory: string): Promise<dashboardTile[]> {
    return await dbProduction(unitId,ordeCategory)
  }
  async productionDashboardDetail(tag: string, unitId: string, orderCategory: string): Promise<any[]> {
  return await dbProductionDetail(tag,unitId,orderCategory)
  }

  async stockDashboard(store: string, fromDate: string, toDate: string): Promise<dashboardTile[]> {
    return await dbStock(store,fromDate,toDate)
  }

  async stockDashboardDetail(tag: string, store: string, fromDate: string, toDate: string): Promise<any[]> {
    return await dbStockDetail(tag, store, fromDate, toDate)
  }

  async stockReceivingMonthWise(store: string, fromDate: string, toDate: string): Promise<any[]> {
   return await dbStockReceivingMonthWise(store,fromDate,toDate)
  }

  async accountDashboard(dated: string): Promise<any[]> {
    return await dbAccount(dated);
  }

  async accountDashboardDetail(tag:string,dated: string): Promise<any[]> {
    return await dbAccountDetail(tag,dated)
  }

 async exportDashboard(unitId: string): Promise<any[]> {
    return await dbExport(unitId)
  }
  async exportDashboardDetail(tag: string,unitId: string): Promise<any[]> {
    return dbExportDeail(tag,unitId)
  }

}

export default DashboardRepo