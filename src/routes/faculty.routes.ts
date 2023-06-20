import {
    deleteFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
} from 'controllers/faculty.controller';
import { Router } from 'express';
import { updateFacultyValidation } from 'middlewares/faculty.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.get('/:id', getSingleFaculty);
router.get('/', getAllFaculties);
router.patch('/:id', validateRequest(updateFacultyValidation), updateFaculty);
router.delete('/:id', deleteFaculty);

export default router;
