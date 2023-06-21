"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faculty_controller_1 = require("../controllers/faculty.controller");
const express_1 = require("express");
const faculty_validation_1 = require("../middlewares/faculty.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.get('/:id', faculty_controller_1.getSingleFaculty);
router.get('/', faculty_controller_1.getAllFaculties);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.updateFacultyValidation), faculty_controller_1.updateFaculty);
router.delete('/:id', faculty_controller_1.deleteFaculty);
exports.default = router;
