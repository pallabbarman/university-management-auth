"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const academicFaculty_controller_1 = require("../controllers/academicFaculty.controller");
const express_1 = require("express");
const academicFaculty_validation_1 = require("../middlewares/academicFaculty.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.post('/create-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), academicFaculty_controller_1.createAcademicFaculty);
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.FACULTY), academicFaculty_controller_1.getAllAcademicFaculties);
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.FACULTY), academicFaculty_controller_1.getSingleAcademicFaculty);
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validation_1.updateAcademicFacultyValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.FACULTY), academicFaculty_controller_1.updateAcademicFaculty);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN), academicFaculty_controller_1.deleteAcademicFaculty);
exports.default = router;
