import {
    createDepartment,
    deleteDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateDepartment,
} from 'controllers/department.controller';
import { Router } from 'express';
import {
    departmentValidation,
    updateDepartmentValidation,
} from 'middlewares/department.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-department', validateRequest(departmentValidation), createDepartment);
router.get('/:id', getSingleDepartment);
router.patch('/:id', validateRequest(updateDepartmentValidation), updateDepartment);
router.delete('/:id', deleteDepartment);
router.get('/', getAllDepartments);

export default router;
