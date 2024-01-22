import { dashboardTile } from "../Entities/entities";

interface IDashboard {
    hrDashboard(unitId:string,empCategory:string,dated:string):Promise<dashboardTile[]>
    hrDashboardDetail(tag:string,unitId:string,empCategory:string,dated:string):Promise<any[]>
    productionDashboard(unitId:string,ordeCategory:string):Promise<dashboardTile[]>
    productionDashboardDetail(tag:string,unitId:string,orderCategory:string):Promise<any[]>
    stockDashboard(store:string,fromDate:string,toDate:string):Promise<dashboardTile[]>
    stockDashboardDetail(tag:string,store:string,fromDate:string,toDate:string):Promise<any[]>
    stockReceivingMonthWise(store:string,fromDate:string,toDate:string):Promise<any[]>
    accountDashboard(dated:string):Promise<any[]>
    accountDashboardDetail(tag:string,dated:string):Promise<any[]>
    exportDashboard(unitId:string):Promise<any[]>
    exportDashboardDetail(tag:string,unitId:string):Promise<any[]>
}




export default IDashboard