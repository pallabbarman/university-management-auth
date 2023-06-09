import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { createUser } from 'services/user.service';
import catchAsync from 'shared/catchAsync';
import sendResponse from 'shared/sendResponse';
import { IUser } from 'types/user';

// eslint-disable-next-line import/prefer-default-export
export const newUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await createUser(user);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
    });

    next();
});
