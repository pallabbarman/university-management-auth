"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_validation_1 = require("../middlewares/auth.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.loginValidation), auth_controller_1.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.refreshTokenValidation), auth_controller_1.refreshToken);
router.post('/change-password', (0, validateRequest_1.default)(auth_validation_1.changePasswordValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.FACULTY, user_1.USER_ROLE.STUDENT, user_1.USER_ROLE.SUPER_ADMIN), auth_controller_1.changePassword);
exports.default = router;
