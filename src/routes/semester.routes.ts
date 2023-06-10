import { getAllSemesters, getSingleSemester, newSemester } from 'controllers/semester.controller';
import { Router } from 'express';
import { semesterValidation } from 'middlewares/semester.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-semester', validateRequest(semesterValidation), newSemester);
router.get('/:id', getSingleSemester);
router.get('/', getAllSemesters);

export default router;
