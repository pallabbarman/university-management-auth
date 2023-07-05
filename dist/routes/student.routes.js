"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const student_controller_1 = require("../controllers/student.controller");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const student_validation_1 = require("../middlewares/student.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.FACULTY, user_1.USER_ROLE.STUDENT, user_1.USER_ROLE.SUPER_ADMIN), student_controller_1.getSingleStudent);
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.FACULTY, user_1.USER_ROLE.STUDENT, user_1.USER_ROLE.SUPER_ADMIN), student_controller_1.getAllStudents);
router.patch('/:id', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(student_validation_1.updateStudentValidation), student_controller_1.updateStudent);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN), student_controller_1.deleteStudent);
exports.default = router;
