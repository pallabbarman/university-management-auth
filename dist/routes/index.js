"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicFaculty_routes_1 = __importDefault(require("./academicFaculty.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const department_routes_1 = __importDefault(require("./department.routes"));
const faculty_routes_1 = __importDefault(require("./faculty.routes"));
const managementDepartment_routes_1 = __importDefault(require("./managementDepartment.routes"));
const semester_routes_1 = __importDefault(require("./semester.routes"));
const student_routes_1 = __importDefault(require("./student.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.default,
    },
    {
        path: '/semesters',
        route: semester_routes_1.default,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_routes_1.default,
    },
    {
        path: '/departments',
        route: department_routes_1.default,
    },
    {
        path: '/management-departments',
        route: managementDepartment_routes_1.default,
    },
    {
        path: '/students',
        route: student_routes_1.default,
    },
    {
        path: '/faculties',
        route: faculty_routes_1.default,
    },
    {
        path: '/admins',
        route: admin_routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
