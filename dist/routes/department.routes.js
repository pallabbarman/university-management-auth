"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var department_controller_1 = require("controllers/department.controller");
var express_1 = require("express");
var department_validation_1 = require("middlewares/department.validation");
var validateRequest_1 = __importDefault(require("middlewares/validateRequest"));
var router = (0, express_1.Router)();
router.post('/create-department', (0, validateRequest_1.default)(department_validation_1.departmentValidation), department_controller_1.createDepartment);
router.get('/:id', department_controller_1.getSingleDepartment);
router.patch('/:id', (0, validateRequest_1.default)(department_validation_1.updateDepartmentValidation), department_controller_1.updateDepartment);
router.delete('/:id', department_controller_1.deleteDepartment);
router.get('/', department_controller_1.getAllDepartments);
exports.default = router;
