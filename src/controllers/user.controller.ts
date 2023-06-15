import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createUser } from 'services/user.service';
import { IUser } from 'types/user';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';

// eslint-disable-next-line import/prefer-default-export
export const newUser = catchAsync(async (req: Request, res: Response) => {
    const { ...user } = req.body;
    const result = await createUser(user);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
    });
});
