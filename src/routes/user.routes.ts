import { createStudent } from 'controllers/user.controller';
import { Router } from 'express';
import { userValidation } from 'middlewares/user.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-user', validateRequest(userValidation), createStudent);

export default router;
