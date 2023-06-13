import {
    createFaculty,
    deleteFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
} from 'controllers/faculty.controller';
import { Router } from 'express';
import { facultyValidation, updateFacultyValidation } from 'middlewares/faculty.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-faculty', validateRequest(facultyValidation), createFaculty);
router.get('/', getAllFaculties);
router.get('/:id', getSingleFaculty);
router.patch('/:id', validateRequest(updateFacultyValidation), updateFaculty);
router.delete('/:id', deleteFaculty);

export default router;
