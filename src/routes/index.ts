import { Router } from 'express';
import academicFacultyRoutes from './academicFaculty.routes';
import adminsRoutes from './admin.routes';
import auhRoutes from './auth.routes';
import departmentRoutes from './department.routes';
import facultiesRoutes from './faculty.routes';
import managementDepartmentRoutes from './managementDepartment.routes';
import semesterRoutes from './semester.routes';
import studentsRoutes from './student.routes';
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
    {
        path: '/management-departments',
        route: managementDepartmentRoutes,
    },
    {
        path: '/students',
        route: studentsRoutes,
    },
    {
        path: '/faculties',
        route: facultiesRoutes,
    },
    {
        path: '/admins',
        route: adminsRoutes,
    },
    {
        path: '/auth',
        route: auhRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
