import 'dotenv/config'
import cookieParser  from 'cookie-parser'
import express from 'express'
import userRouter from './Routes/userRoutes'
import roleRouter from './Routes/roleRoutes'
import roleGroupRouter from './Routes/roleGroupRoutes'
import userRoleRouter from './Routes/userRoleRoutes'
import authRouter from './Routes/authRoutes'
import auth from './middleWares/auth'


const baseURL = process.env.BASE_URL

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(`${baseURL}/user`,auth,userRouter)
app.use(`${baseURL}/role`,auth,roleRouter)
app.use(`${baseURL}/roleGroup`,auth,roleGroupRouter)
app.use(`${baseURL}/userRole`,auth,userRoleRouter)
app.use(`${baseURL}/auth`,authRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})