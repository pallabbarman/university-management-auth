import {
    deleteAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
} from 'controllers/admin.controller';
import { Router } from 'express';
import { updateAdminValidation } from 'middlewares/admin.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.get('/:id', getSingleAdmin);
router.get('/', getAllAdmins);
router.patch('/:id', validateRequest(updateAdminValidation), updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
