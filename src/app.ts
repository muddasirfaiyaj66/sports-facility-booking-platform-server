import express, { Request, Response } from 'express'
import cors from 'cors'
import { Application } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//application routes

app.use('/api', router)
const test = async (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}

app.get('/', test)
//not found route

app.use(notFound)
export default app
