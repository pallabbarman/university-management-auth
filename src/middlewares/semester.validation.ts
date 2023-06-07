import { semesterCodes, semesterMonths, semesterTitles } from 'shared/semester.constant';
import { z } from 'zod';

// eslint-disable-next-line import/prefer-default-export
export const semesterValidation = z.object({
    body: z.object({
        title: z.enum([...semesterTitles] as [string, ...string[]], {
            required_error: 'Title is required!',
        }),
        year: z.number({
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
