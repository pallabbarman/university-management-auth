/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { signInUser } from 'services/auth.service';
import { ILoginUserResponse } from 'types/auth';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await signInUser(loginData);

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully',
        data: result,
    });
});
