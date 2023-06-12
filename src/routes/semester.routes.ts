import {
    deleteSemester,
    getAllSemesters,
    getSingleSemester,
    newSemester,
    updateSemester,
} from 'controllers/semester.controller';
import { Router } from 'express';
import { semesterValidation, updateSemesterValidation } from 'middlewares/semester.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-semester', validateRequest(semesterValidation), newSemester);
router.get('/:id', getSingleSemester);
router.get('/', getAllSemesters);
router.patch('/:id', validateRequest(updateSemesterValidation), updateSemester);
router.delete('/:id', deleteSemester);

export default router;
