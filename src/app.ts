import express, { Application, Request, Response, urlencoded } from 'express'

import cors from 'cors'
import usersRouter from './app/Modules/users/users.route'

const app: Application = express()
app.use(cors())
// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use('/api/v1/users', usersRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send(
    'University is running well and will started the logic soon .....................',
  )
})

export default app
