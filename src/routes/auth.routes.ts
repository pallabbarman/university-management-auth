/* eslint-disable comma-dangle */
import { changePassword, loginUser, refreshToken } from 'controllers/auth.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import {
    changePasswordValidation,
    loginValidation,
    refreshTokenValidation,
} from 'middlewares/auth.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post('/login', validateRequest(loginValidation), loginUser);
router.post('/refresh-token', validateRequest(refreshTokenValidation), refreshToken);
router.post(
    '/change-password',
    validateRequest(changePasswordValidation),
    auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT, USER_ROLE.SUPER_ADMIN),
    changePassword
);

export default router;
