"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("controllers/user.controller");
var express_1 = require("express");
var user_validation_1 = require("middlewares/user.validation");
var validateRequest_1 = __importDefault(require("middlewares/validateRequest"));
var router = (0, express_1.Router)();
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.userValidation), user_controller_1.createStudent);
exports.default = router;
