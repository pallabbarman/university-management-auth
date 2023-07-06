/* eslint-disable comma-dangle */
import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import User from 'models/user.model';
import { ILogin, ILoginUserResponse, IRefreshTokenResponse } from 'types/auth';
import { IChangePassword } from 'types/password';
import { createToken, verifyToken } from 'utils/jwtGenerator';

export const signInUser = async (payload: ILogin): Promise<ILoginUserResponse> => {
    const { id, password } = payload;

    const user = new User();
    let isPasswordMatched;

    const isUserExist = await user.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
    }

    if (isUserExist.password) {
        isPasswordMatched = await user.isPasswordMatched(password, isUserExist?.password);
    }

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
    }

    const { id: userId, role, needsChangePassword } = isUserExist;

    // create access token
    const accessToken = createToken(
        { userId, role },
        envConfig.jwt.secret as Secret,
        envConfig.jwt.expires_in as string
    );

    // create refresh token
    const refreshToken = createToken(
        { userId, role },
        envConfig.jwt.refresh_token as Secret,
        envConfig.jwt.refresh_expire_in as string
    );

    return {
        accessToken,
        refreshToken,
        needsChangePassword,
    };
};

export const reFreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    // verify token
    let verifiedToken = null;
    const user = new User();

    try {
        verifiedToken = verifyToken(token, envConfig.jwt.refresh_token as Secret);
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token!');
    }

    const { userId } = verifiedToken;

    const isUserExist = await user.isUserExist(userId);

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
    }

    const newAccessToken = createToken(
        {
            id: isUserExist.id,
            role: isUserExist.role,
        },
        envConfig.jwt.secret as Secret,
        envConfig.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken,
    };
};

export const passwordChange = async (
    userToken: JwtPayload,
    payload: IChangePassword
): Promise<void> => {
    const { oldPassword, newPassword } = payload;
    const { userId } = userToken;
    const user = new User();
    let isPasswordMatched;

    const isUserExist = await User.findOne({ id: userId }).select('+password');
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
    }

    if (isUserExist.password) {
        isPasswordMatched = await user.isPasswordMatched(oldPassword, isUserExist?.password);
    }

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
    }

    isUserExist.password = newPassword;
    isUserExist.needsChangePassword = false;

    // updating using save()
    isUserExist.save();
};
