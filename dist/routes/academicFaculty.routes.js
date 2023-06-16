"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var academicFaculty_controller_1 = require("controllers/academicFaculty.controller");
var express_1 = require("express");
var academicFaculty_validation_1 = require("middlewares/academicFaculty.validation");
var validateRequest_1 = __importDefault(require("middlewares/validateRequest"));
var router = (0, express_1.Router)();
router.post('/create-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation), academicFaculty_controller_1.createAcademicFaculty);
router.get('/', academicFaculty_controller_1.getAllAcademicFaculties);
router.get('/:id', academicFaculty_controller_1.getSingleAcademicFaculty);
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validation_1.updateAcademicFacultyValidation), academicFaculty_controller_1.updateAcademicFaculty);
router.delete('/:id', academicFaculty_controller_1.deleteAcademicFaculty);
exports.default = router;
