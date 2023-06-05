import { newUser } from 'controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/create-user', newUser);

export default router;
