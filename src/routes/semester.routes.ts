/* eslint-disable comma-dangle */
import {
    deleteSemester,
    getAllSemesters,
    getSingleSemester,
    newSemester,
    updateSemester,
} from 'controllers/semester.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import { semesterValidation, updateSemesterValidation } from 'middlewares/semester.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post(
    '/create-semester',
    validateRequest(semesterValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    newSemester
);
router.get(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
    getSingleSemester
);
router.get(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
    getAllSemesters
);
router.patch(
    '/:id',
    validateRequest(updateSemesterValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    updateSemester
);
router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), deleteSemester);

export default router;
