/* eslint-disable comma-dangle */
import {
    deleteFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
} from 'controllers/faculty.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import { updateFacultyValidation } from 'middlewares/faculty.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.get(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY),
    getSingleFaculty
);
router.get('/', auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY), getAllFaculties);
router.patch(
    '/:id',
    validateRequest(updateFacultyValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    updateFaculty
);
router.delete('/:id', auth(USER_ROLE.SUPER_ADMIN), deleteFaculty);

export default router;
