/* eslint-disable comma-dangle */
import {
    createManagementDepartment,
    deleteManagementDepartment,
    getAllManagementDepartments,
    getSingleManagementDepartment,
    updateManagementDepartment,
} from 'controllers/managementDepartment.controller';
import { Router } from 'express';
import {
    managementDepartmentValidation,
    updateManagementDepartmentValidation,
} from 'middlewares/managementDepartment.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post(
    '/create-department',
    validateRequest(managementDepartmentValidation),
    createManagementDepartment
);
router.get('/:id', getSingleManagementDepartment);
router.patch(
    '/:id',
    validateRequest(updateManagementDepartmentValidation),
    updateManagementDepartment
);
router.delete('/:id', deleteManagementDepartment);
router.get('/', getAllManagementDepartments);

export default router;
