import 'dotenv/config'
import cookieParser  from 'cookie-parser'
import express from 'express'
import userRouter from './Routes/userRoutes'
import roleRouter from './Routes/roleRoutes'
import roleGroupRouter from './Routes/roleGroupRoutes'
import userRoleRouter from './Routes/userRoleRoutes'
import authRouter from './Routes/authRoutes'
import dashboardRouter from './Routes/dashboardRoutes'
import utilityRouter from './Routes/utilityRoutes'
import auth from './middleWares/auth'
import roleProtection from './middleWares/routesProtection'

import cors from 'cors'



const baseURL = process.env.BASE_URL

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin:any, callback:any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true
}

const app = express()
app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

 
app.use(`${baseURL}/user`,auth,roleProtection('Manage Users'),userRouter)
app.use(`${baseURL}/role`,auth,roleProtection('Manage Roles'),roleRouter)
app.use(`${baseURL}/roleGroup`,auth,roleProtection('Manage Role Groups'),roleGroupRouter)
app.use(`${baseURL}/userRole`,auth,roleProtection('Assign Roles'),userRoleRouter)
app.use(`${baseURL}/dashboard`,dashboardRouter)
app.use(`${baseURL}/utility`,utilityRouter)
app.use(`${baseURL}/auth`,authRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})