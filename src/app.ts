import cookieParser from 'cookie-parser'
import express from 'express'
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

app.use(globalErrorHandler)
//not found route

app.use(notFound)
export default app
