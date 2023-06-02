import { Request, Response } from 'express';
import { createUser } from 'services/user.service';

// eslint-disable-next-line import/prefer-default-export
export const newUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const result = await createUser(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to create user!',
        });
    }
};
