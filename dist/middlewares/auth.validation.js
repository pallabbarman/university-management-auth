"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
/* eslint-disable import/prefer-default-export */
const zod_1 = __importDefault(require("zod"));
exports.loginValidation = zod_1.default.object({
    body: zod_1.default.object({
        id: zod_1.default.string({
            required_error: 'Id is required!',
        }),
        password: zod_1.default.string({
            required_error: 'Password is required!',
        }),
    }),
});
