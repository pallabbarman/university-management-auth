"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semester_controller_1 = require("../controllers/semester.controller");
const express_1 = require("express");
const semester_validation_1 = require("../middlewares/semester.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/create-semester', (0, validateRequest_1.default)(semester_validation_1.semesterValidation), semester_controller_1.newSemester);
router.get('/:id', semester_controller_1.getSingleSemester);
router.get('/', semester_controller_1.getAllSemesters);
router.patch('/:id', (0, validateRequest_1.default)(semester_validation_1.updateSemesterValidation), semester_controller_1.updateSemester);
router.delete('/:id', semester_controller_1.deleteSemester);
exports.default = router;
