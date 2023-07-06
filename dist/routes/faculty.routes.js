"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const faculty_controller_1 = require("../controllers/faculty.controller");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const faculty_validation_1 = require("../middlewares/faculty.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.FACULTY), faculty_controller_1.getSingleFaculty);
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.FACULTY), faculty_controller_1.getAllFaculties);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.updateFacultyValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), faculty_controller_1.updateFaculty);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN), faculty_controller_1.deleteFaculty);
exports.default = router;
