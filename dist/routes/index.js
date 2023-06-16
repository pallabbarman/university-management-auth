"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var academicFaculty_routes_1 = __importDefault(require("./academicFaculty.routes"));
var department_routes_1 = __importDefault(require("./department.routes"));
var semester_routes_1 = __importDefault(require("./semester.routes"));
var student_routes_1 = __importDefault(require("./student.routes"));
var user_routes_1 = __importDefault(require("./user.routes"));
var router = (0, express_1.Router)();
var moduleRoutes = [
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
        path: '/students',
        route: student_routes_1.default,
    },
];
moduleRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
