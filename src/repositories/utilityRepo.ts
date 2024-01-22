import 'reflect-metadata'
import { injectable } from 'inversify'
import IUtility from '../interfaces/IUtility'
import Utility from '../utilites/dbUtility'


@injectable()
class UtilityClass implements IUtility {
 
   
    async getUnits(): Promise<any[]> {
        const result = await Utility.exeQuery("Select ID as UnitID,UnitName from CompanyUnit Where Active=1")
         return result
    }

    async getUnitsWithAll(): Promise<any[]> {
        const result = await Utility.exeQuery(" Select '000' as UnitID ,'All' as UnitName UNION ALL Select ID as UnitID,UnitName from CompanyUnit Where Active=1")
        return result
    }

    async getStoresWithAll(): Promise<any[]> {
        const result = await Utility.exeQuery(" Select 'All' as storeId ,'All' as storeName UNION ALL Select store_Name as storeId, store_Name storeName from Stock_Store Where ISNULL(isSubStore,0)=0")
        return result
    }

}

export default UtilityClass