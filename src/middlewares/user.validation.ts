import { z } from 'zod';

// eslint-disable-next-line import/prefer-default-export
export const userValidation = z.object({
    body: z.object({
        user: z.object({
            role: z.string({
                required_error: 'role is required!',
            }),
            password: z.string().optional(),
        }),
    }),
});
