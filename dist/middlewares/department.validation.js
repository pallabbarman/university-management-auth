"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentValidation = exports.departmentValidation = void 0;
var zod_1 = require("zod");
exports.departmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'Academic Faculty is required',
        }),
    }),
});
exports.updateDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
    }),
});
