"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const department_controller_1 = require("../controllers/department.controller");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const department_validation_1 = require("../middlewares/department.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.post('/create-department', (0, validateRequest_1.default)(department_validation_1.departmentValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), department_controller_1.createDepartment);
router.get('/', department_controller_1.getAllDepartments);
router.get('/:id', department_controller_1.getSingleDepartment);
router.patch('/:id', (0, validateRequest_1.default)(department_validation_1.updateDepartmentValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), department_controller_1.updateDepartment);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN), department_controller_1.deleteDepartment);
exports.default = router;
