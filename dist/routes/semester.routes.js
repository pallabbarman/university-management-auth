"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const semester_controller_1 = require("../controllers/semester.controller");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const semester_validation_1 = require("../middlewares/semester.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.post('/create-semester', (0, validateRequest_1.default)(semester_validation_1.semesterValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), semester_controller_1.newSemester);
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.FACULTY, user_1.USER_ROLE.STUDENT), semester_controller_1.getSingleSemester);
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.FACULTY, user_1.USER_ROLE.STUDENT), semester_controller_1.getAllSemesters);
router.patch('/:id', (0, validateRequest_1.default)(semester_validation_1.updateSemesterValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), semester_controller_1.updateSemester);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), semester_controller_1.deleteSemester);
exports.default = router;
