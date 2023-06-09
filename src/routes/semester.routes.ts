import { getAllSemesters, newSemester } from 'controllers/semester.controller';
import { Router } from 'express';
import { semesterValidation } from 'middlewares/semester.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.get('/', getAllSemesters);
router.post('/create-semester', validateRequest(semesterValidation), newSemester);

export default router;
