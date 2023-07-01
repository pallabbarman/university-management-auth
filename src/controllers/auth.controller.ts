import envConfig from 'configs/env.config';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { passwordChange, reFreshToken, signInUser } from 'services/auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from 'types/auth';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await signInUser(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
        secure: envConfig.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully!',
        data: others,
    });
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const result = await reFreshToken(token);

    // set refresh token into cookie
    const cookieOptions = {
        secure: envConfig.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', token, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Refresh token generate successfully!',
        data: result,
    });
});

export const changePassword = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const { ...passwordData } = req.body;

    await passwordChange(user, passwordData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password Changed successfully!',
    });
});
