import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import express from 'express';

const router = express.Router();
router.post(
  '/create-academicSemester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);

router.get('/', AcademicSemesterController.getAllSemesters);
export const AcademicSemesterRoutes = router;
