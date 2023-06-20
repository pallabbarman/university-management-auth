"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSemesterValidation = exports.semesterValidation = void 0;
/* eslint-disable comma-dangle */
const semester_1 = require("../constants/semester");
const zod_1 = require("zod");
exports.semesterValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...semester_1.semesterTitles], {
            required_error: 'Title is required!',
        }),
        year: zod_1.z.string({
            required_error: 'Year is required!',
        }),
        code: zod_1.z.enum([...semester_1.semesterCodes], {
            required_error: 'Code is required!',
        }),
        startMonth: zod_1.z.enum([...semester_1.semesterMonths], {
            required_error: 'Start month is required!',
        }),
        endMonth: zod_1.z.enum([...semester_1.semesterMonths], {
            required_error: 'End month is required!',
        }),
    }),
});
exports.updateSemesterValidation = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...semester_1.semesterTitles], {
            required_error: 'Title is required!',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required!',
        })
            .optional(),
        code: zod_1.z
            .enum([...semester_1.semesterCodes], {
            required_error: 'Code is required!',
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...semester_1.semesterMonths], {
            required_error: 'Start month is required!',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...semester_1.semesterMonths], {
            required_error: 'End month is required!',
        })
            .optional(),
    }),
})
    .refine((data) => (data.body.title && data.body.code) || (!data.body.title && !data.body.code), {
    message: 'Both title or code should be given or not!',
});
