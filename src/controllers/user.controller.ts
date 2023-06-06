import { RequestHandler } from 'express';
import { createUser } from 'services/user.service';

// eslint-disable-next-line import/prefer-default-export
export const newUser: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req.body;
        const result = await createUser(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
