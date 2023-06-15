import { z } from 'zod';

export const departmentValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        academicFaculty: z.string({
            required_error: 'Academic Faculty is required',
        }),
    }),
});

export const updateDepartmentValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        academicFaculty: z.string().optional(),
    }),
});
