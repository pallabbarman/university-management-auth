import { Router } from 'express';
import facultyRoutes from './faculty.routes';
import semesterRoutes from './semester.routes';
import usersRoutes from './user.routes';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: usersRoutes,
    },
    {
        path: '/semesters',
        route: semesterRoutes,
    },
    {
        path: '/faculties',
        route: facultyRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
