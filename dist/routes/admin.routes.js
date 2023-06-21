"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("../controllers/admin.controller");
const express_1 = require("express");
const admin_validation_1 = require("../middlewares/admin.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.get('/:id', admin_controller_1.getSingleAdmin);
router.get('/', admin_controller_1.getAllAdmins);
router.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.updateAdminValidation), admin_controller_1.updateAdmin);
router.delete('/:id', admin_controller_1.deleteAdmin);
exports.default = router;
