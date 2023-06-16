"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicFacultyValidation = exports.academicFacultyValidation = void 0;
var zod_1 = require("zod");
exports.academicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
exports.updateAcademicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
