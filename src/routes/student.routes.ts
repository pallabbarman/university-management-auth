/* eslint-disable comma-dangle */
import {
    deleteStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent,
} from 'controllers/student.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import { updateStudentValidation } from 'middlewares/student.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.get(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT, USER_ROLE.SUPER_ADMIN),
    getSingleStudent
);
router.get(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT, USER_ROLE.SUPER_ADMIN),
    getAllStudents
);
router.patch(
    '/:id',
    auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
    validateRequest(updateStudentValidation),
    updateStudent
);
router.delete('/:id', auth(USER_ROLE.SUPER_ADMIN), deleteStudent);

export default router;
