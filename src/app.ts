import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//  Promise.reject(new Error ("Unhandled Promise rejection"))

//   //   res.send(
//   //     'University is running well and will started the logic soon .....................',
//   //   )
// })

// global error handler

app.use(globalErrorHandler);

export default app;
