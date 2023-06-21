import { createAdmin, createFaculty, createStudent } from 'controllers/user.controller';
import { Router } from 'express';
import { adminValidation, facultyValidation, userValidation } from 'middlewares/user.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/create-student', validateRequest(userValidation), createStudent);
router.post('/create-faculty', validateRequest(facultyValidation), createFaculty);
router.post('/create-admin', validateRequest(adminValidation), createAdmin);

export default router;
