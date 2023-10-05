/* eslint-disable comma-dangle */
import { createAdmin, createFaculty, createStudent } from 'controllers/user.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import { adminValidation, facultyValidation, userValidation } from 'middlewares/user.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post(
    '/create-student',
    validateRequest(userValidation),
    auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
    createStudent
);
router.post(
    '/create-faculty',
    validateRequest(facultyValidation),
    auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
    createFaculty
);
router.post(
    '/create-admin',
    validateRequest(adminValidation),
    // auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
    createAdmin
);

export default router;
