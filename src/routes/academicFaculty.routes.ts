import {
    createAcademicFaculty,
    deleteAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
} from 'controllers/academicFaculty.controller';
import { Router } from 'express';
import {
    academicFacultyValidation,
    updateAcademicFacultyValidation,
} from 'middlewares/academicFaculty.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-faculty', validateRequest(academicFacultyValidation), createAcademicFaculty);
router.get('/', getAllAcademicFaculties);
router.get('/:id', getSingleAcademicFaculty);
router.patch('/:id', validateRequest(updateAcademicFacultyValidation), updateAcademicFaculty);
router.delete('/:id', deleteAcademicFaculty);

export default router;
