"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const admin_controller_1 = require("../controllers/admin.controller");
const express_1 = require("express");
const admin_validation_1 = require("../middlewares/admin.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), admin_controller_1.getSingleAdmin);
router.get('/', admin_controller_1.getAllAdmins);
router.patch('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(admin_validation_1.updateAdminValidation), admin_controller_1.updateAdmin);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN), admin_controller_1.deleteAdmin);
exports.default = router;
