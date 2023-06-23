/* eslint-disable comma-dangle */
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
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post(
    '/create-faculty',
    validateRequest(academicFacultyValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    createAcademicFaculty
);
router.get(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.STUDENT),
    getAllAcademicFaculties
);
router.get(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
    getSingleAcademicFaculty
);
router.patch(
    '/:id',
    validateRequest(updateAcademicFacultyValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY),
    updateAcademicFaculty
);
router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), deleteAcademicFaculty);

export default router;
