"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidation = exports.refreshTokenValidation = exports.loginValidation = void 0;
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
exports.refreshTokenValidation = zod_1.default.object({
    cookies: zod_1.default.object({
        refreshToken: zod_1.default.string({
            required_error: 'Refresh Token is required!',
        }),
    }),
});
exports.changePasswordValidation = zod_1.default.object({
    body: zod_1.default.object({
        oldPassword: zod_1.default.string({
            required_error: 'Old password is required!',
        }),
        newPassword: zod_1.default.string({
            required_error: 'New password is required!',
        }),
    }),
});
