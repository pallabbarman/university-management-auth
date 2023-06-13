import { z } from 'zod';

export const facultyValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
    }),
});

export const updateFacultyValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
    }),
});
