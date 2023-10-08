import 'dotenv/config'
import express,{Request,Response} from 'express'
import userRouter from './Routes/userRoutes'
const baseURL = process.env.BASE_URL

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(`${baseURL}/user`,userRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})