import { AcademicSemesterRoutes } from './../Modules/academicSemester/academicSemester.route';
import express from 'express';
import { UserRoutes } from '../Modules/users/user.route';

const routes = express.Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];
modulesRoutes.forEach(route => routes.use(route.path, route.route));
export default routes;
