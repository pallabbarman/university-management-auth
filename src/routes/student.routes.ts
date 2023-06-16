import {
    deleteStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent,
} from 'controllers/student.controller';
import { Router } from 'express';
import { updateStudentValidation } from 'middlewares/student.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.get('/:id', getSingleStudent);
router.get('/', getAllStudents);
router.patch('/:id', validateRequest(updateStudentValidation), updateStudent);
router.delete('/:id', deleteStudent);

export default router;
