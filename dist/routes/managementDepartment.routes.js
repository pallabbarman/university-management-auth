"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const managementDepartment_controller_1 = require("../controllers/managementDepartment.controller");
const express_1 = require("express");
const managementDepartment_validation_1 = require("../middlewares/managementDepartment.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/create-department', (0, validateRequest_1.default)(managementDepartment_validation_1.managementDepartmentValidation), managementDepartment_controller_1.createManagementDepartment);
router.get('/:id', managementDepartment_controller_1.getSingleManagementDepartment);
router.patch('/:id', (0, validateRequest_1.default)(managementDepartment_validation_1.updateManagementDepartmentValidation), managementDepartment_controller_1.updateManagementDepartment);
router.delete('/:id', managementDepartment_controller_1.deleteManagementDepartment);
router.get('/', managementDepartment_controller_1.getAllManagementDepartments);
exports.default = router;
