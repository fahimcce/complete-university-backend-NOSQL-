
import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidaions } from "./academicSemester.validation";
import validateRequest from "../../middlewares/validRequest";

const router = Router();

router.post('/create-academic-semester',
    validateRequest(AcademicSemesterValidaions.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester);

router.get('/:_id', AcademicSemesterControllers.getSingleSemester);

router.get('/', AcademicSemesterControllers.getAllSemesters);

router.patch('/:semesterId',
    validateRequest(AcademicSemesterValidaions.updateAcademicSemesterValidationSchema), // Add validation if you have a schema
    AcademicSemesterControllers.updateAcademicSemester
  );
  


export const AcademicSemesterRoutes = router;