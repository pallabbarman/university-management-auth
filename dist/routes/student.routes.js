"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_controller_1 = require("../controllers/student.controller");
const express_1 = require("express");
const student_validation_1 = require("../middlewares/student.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.get('/:id', student_controller_1.getSingleStudent);
router.get('/', student_controller_1.getAllStudents);
router.patch('/:id', (0, validateRequest_1.default)(student_validation_1.updateStudentValidation), student_controller_1.updateStudent);
router.delete('/:id', student_controller_1.deleteStudent);
exports.default = router;
