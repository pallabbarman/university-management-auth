"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManagementDepartmentValidation = exports.managementDepartmentValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.managementDepartmentValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required',
        }),
    }),
});
exports.updateManagementDepartmentValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required',
        }),
    }),
});
