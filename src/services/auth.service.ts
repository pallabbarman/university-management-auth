/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import User from 'models/user.model';
import { ILogin, ILoginUserResponse } from 'types/auth';
import createToken from 'utils/jwtGenerator';

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
