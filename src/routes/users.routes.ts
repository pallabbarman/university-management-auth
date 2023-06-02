import { newUser } from 'controllers/users.controller';
import { Router } from 'express';

const router = Router();

router.post('/create-user', newUser);

export default router;
