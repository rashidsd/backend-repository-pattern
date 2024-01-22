import db from '../db.config'
import { QueryTypes } from "sequelize";


class Utility {
    static async exeQuery(qry:string,pram?:{}) {
        return await db.query(qry,{
            replacements: {...pram},
            type:QueryTypes.SELECT,
            raw: true
        })
    }
}

export default Utility