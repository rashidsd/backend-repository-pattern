import { Sequelize } from "sequelize";

const db =  new Sequelize({
    host:process.env.HOST,
    database: process.env.DATABASE,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    dialect:'mssql'
});


export const connectDb = async ()=> {
    try {
        await db.authenticate();
        console.log('Database Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
}

export default db