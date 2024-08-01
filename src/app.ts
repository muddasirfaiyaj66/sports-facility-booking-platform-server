import cookieParser from 'cookie-parser'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Application } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

//parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }))
//application routes

app.use('/api', router)
app.use('/' ,(req:Request,res:Response)=>{
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; text-align: center;margin:20 0px auto;color:white;background-color:black; padding:50px 0px">
          <h1>Welcome to <span style="color:#4ef037">Sports</span> Facility <span style="color:red">Booking</span> Platform <span style="color:#ff0000">Server</span> 😊</h1>
        </div>
      `);
      
})
app.use(globalErrorHandler)
//not found route

app.use(notFound)
export default app
