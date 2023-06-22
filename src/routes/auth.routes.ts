import { loginUser } from 'controllers/auth.controller';
import { Router } from 'express';
import { loginValidation } from 'middlewares/auth.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/login', validateRequest(loginValidation), loginUser);

export default router;
