/* eslint-disable comma-dangle */
import { semesterCodes, semesterMonths, semesterTitles } from 'constants/semester';
import { z } from 'zod';

export const semesterValidation = z.object({
    body: z.object({
        title: z.enum([...semesterTitles] as [string, ...string[]], {
            required_error: 'Title is required!',
        }),
        year: z.string({
            required_error: 'Year is required!',
        }),
        code: z.enum([...semesterCodes] as [string, ...string[]], {
            required_error: 'Code is required!',
        }),
        startMonth: z.enum([...semesterMonths] as [string, ...string[]], {
            required_error: 'Start month is required!',
        }),
        endMonth: z.enum([...semesterMonths] as [string, ...string[]], {
            required_error: 'End month is required!',
        }),
    }),
});

export const updateSemesterValidation = z
    .object({
        body: z.object({
            title: z
                .enum([...semesterTitles] as [string, ...string[]], {
                    required_error: 'Title is required!',
                })
                .optional(),
            year: z
                .string({
                    required_error: 'Year is required!',
                })
                .optional(),
            code: z
                .enum([...semesterCodes] as [string, ...string[]], {
                    required_error: 'Code is required!',
                })
                .optional(),
            startMonth: z
                .enum([...semesterMonths] as [string, ...string[]], {
                    required_error: 'Start month is required!',
                })
                .optional(),
            endMonth: z
                .enum([...semesterMonths] as [string, ...string[]], {
                    required_error: 'End month is required!',
                })
                .optional(),
        }),
    })
    .refine(
        (data) => (data.body.title && data.body.code) || (!data.body.title && !data.body.code),
        {
            message: 'Both title or code should be given or not!',
        }
    );
