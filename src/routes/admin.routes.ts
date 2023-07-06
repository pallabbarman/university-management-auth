/* eslint-disable comma-dangle */
import {
    deleteAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
} from 'controllers/admin.controller';
import { Router } from 'express';
import { updateAdminValidation } from 'middlewares/admin.validation';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.get('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), getSingleAdmin);
router.get('/', auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), getAllAdmins);
router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    validateRequest(updateAdminValidation),
    updateAdmin
);
router.delete('/:id', auth(USER_ROLE.SUPER_ADMIN), deleteAdmin);

export default router;
