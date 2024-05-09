import express, { Application, urlencoded } from 'express'

import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/Modules/users/user.route'

const app: Application = express()
app.use(cors())
// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use('/api/v1/users', UserRoutes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
 Promise.reject(new Error ("Unhandled Promise rejection"))

  //   res.send(
  //     'University is running well and will started the logic soon .....................',
  //   )
})

// global error handler

app.use(globalErrorHandler)

export default app
