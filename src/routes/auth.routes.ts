import { loginUser } from 'controllers/auth.controller';
import { Router } from 'express';
import { loginValidation, refreshTokenValidation } from 'middlewares/auth.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/login', validateRequest(loginValidation), loginUser);
router.post('/refresh-token', validateRequest(refreshTokenValidation), loginUser);

export default router;
