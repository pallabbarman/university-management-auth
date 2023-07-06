/* eslint-disable comma-dangle */
import {
    createManagementDepartment,
    deleteManagementDepartment,
    getAllManagementDepartments,
    getSingleManagementDepartment,
    updateManagementDepartment,
} from 'controllers/managementDepartment.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import {
    managementDepartmentValidation,
    updateManagementDepartmentValidation,
} from 'middlewares/managementDepartment.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post(
    '/create-department',
    validateRequest(managementDepartmentValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    createManagementDepartment
);
router.get(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
    getSingleManagementDepartment
);
router.patch(
    '/:id',
    validateRequest(updateManagementDepartmentValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    updateManagementDepartment
);
router.delete('/:id', auth(USER_ROLE.SUPER_ADMIN), deleteManagementDepartment);
router.get(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
    getAllManagementDepartments
);

export default router;
