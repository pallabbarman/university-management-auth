"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_validation_1 = require("../middlewares/user.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.post('/create-student', (0, validateRequest_1.default)(user_validation_1.userValidation), (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.ADMIN), user_controller_1.createStudent);
router.post('/create-faculty', (0, validateRequest_1.default)(user_validation_1.facultyValidation), (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.ADMIN), user_controller_1.createFaculty);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.adminValidation), (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.ADMIN), user_controller_1.createAdmin);
exports.default = router;
