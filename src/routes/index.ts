import { Router } from 'express';
import semesterRouter from './semester.routes';
import usersRouter from './user.routes';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: usersRouter,
    },
    {
        path: '/semesters',
        route: semesterRouter,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
