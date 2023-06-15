import { Router } from 'express';
import academicFacultyRoutes from './academicFaculty.routes';
import departmentRoutes from './department.routes';
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
        path: '/academic-faculties',
        route: academicFacultyRoutes,
    },
    {
        path: '/departments',
        route: departmentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
