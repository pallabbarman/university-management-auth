"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const user_validation_1 = require("../middlewares/user.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/create-student', (0, validateRequest_1.default)(user_validation_1.userValidation), user_controller_1.createStudent);
router.post('/create-faculty', (0, validateRequest_1.default)(user_validation_1.facultyValidation), user_controller_1.createFaculty);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.adminValidation), user_controller_1.createAdmin);
exports.default = router;
