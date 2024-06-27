import express, { Request, Response } from 'express'
import cors from 'cors'
import { Application } from 'express'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//application routes

const test = async (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}

app.get('/', test)

export default app
