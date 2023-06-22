/* eslint-disable import/prefer-default-export */
import z from 'zod';

export const loginValidation = z.object({
    body: z.object({
        id: z.string({
            required_error: 'Id is required!',
        }),
        password: z.string({
            required_error: 'Password is required!',
        }),
    }),
});
