import { createFaculty, createStudent } from 'controllers/user.controller';
import { Router } from 'express';
import { facultyValidation, userValidation } from 'middlewares/user.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-student', validateRequest(userValidation), createStudent);
router.post('/create-faculty', validateRequest(facultyValidation), createFaculty);

export default router;
