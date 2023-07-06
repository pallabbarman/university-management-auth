/* eslint-disable comma-dangle */
import {
    createDepartment,
    deleteDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateDepartment,
} from 'controllers/department.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import {
    departmentValidation,
    updateDepartmentValidation,
} from 'middlewares/department.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post(
    '/create-department',
    validateRequest(departmentValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    createDepartment
);
router.get('/', getAllDepartments);
router.get('/:id', getSingleDepartment);
router.patch(
    '/:id',
    validateRequest(updateDepartmentValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    updateDepartment
);
router.delete('/:id', auth(USER_ROLE.SUPER_ADMIN), deleteDepartment);

export default router;
