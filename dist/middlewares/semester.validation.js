"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSemesterValidation = exports.semesterValidation = void 0;
/* eslint-disable comma-dangle */
var semester_1 = require("constants/semester");
var zod_1 = require("zod");
exports.semesterValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum(__spreadArray([], semester_1.semesterTitles, true), {
            required_error: 'Title is required!',
        }),
        year: zod_1.z.string({
            required_error: 'Year is required!',
        }),
        code: zod_1.z.enum(__spreadArray([], semester_1.semesterCodes, true), {
            required_error: 'Code is required!',
        }),
        startMonth: zod_1.z.enum(__spreadArray([], semester_1.semesterMonths, true), {
            required_error: 'Start month is required!',
        }),
        endMonth: zod_1.z.enum(__spreadArray([], semester_1.semesterMonths, true), {
            required_error: 'End month is required!',
        }),
    }),
});
exports.updateSemesterValidation = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum(__spreadArray([], semester_1.semesterTitles, true), {
            required_error: 'Title is required!',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required!',
        })
            .optional(),
        code: zod_1.z
            .enum(__spreadArray([], semester_1.semesterCodes, true), {
            required_error: 'Code is required!',
        })
            .optional(),
        startMonth: zod_1.z
            .enum(__spreadArray([], semester_1.semesterMonths, true), {
            required_error: 'Start month is required!',
        })
            .optional(),
        endMonth: zod_1.z
            .enum(__spreadArray([], semester_1.semesterMonths, true), {
            required_error: 'End month is required!',
        })
            .optional(),
    }),
})
    .refine(function (data) { return (data.body.title && data.body.code) || (!data.body.title && !data.body.code); }, {
    message: 'Both title or code should be given or not!',
});
