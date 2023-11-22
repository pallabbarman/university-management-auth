/* eslint-disable comma-dangle */
import { hash } from 'bcrypt';
import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import Admin from 'models/admin.model';
import Faculty from 'models/faculty.model';
import Student from 'models/student.model';
import User from 'models/user.model';
import { ILogin, ILoginUserResponse, IRefreshTokenResponse } from 'types/auth';
import { IChangePassword } from 'types/password';
import { USER_ROLE } from 'types/user';
import { createResetToken, createToken, verifyToken } from 'utils/jwtGenerator';
import sendEmail from 'utils/sendResetMail';

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

export const forgotPass = async (payload: { id: string }) => {
    const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 });

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
    }

    let profile = null;
    if (user.role === USER_ROLE.ADMIN) {
        profile = await Admin.findOne({ id: user.id });
    } else if (user.role === USER_ROLE.FACULTY) {
        profile = await Faculty.findOne({ id: user.id });
    } else if (user.role === USER_ROLE.STUDENT) {
        profile = await Student.findOne({ id: user.id });
    }

    if (!profile) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Profile not found!');
    }

    if (!profile.email) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!');
    }

    const passResetToken = await createResetToken(
        { id: user.id },
        envConfig.jwt.secret as string,
        '50m'
    );

    const resetLink = `${envConfig.resetlink}token=${passResetToken}`;

    console.log('profile: ', profile);
    await sendEmail(
        profile.email,
        `
        <div>
          <p>Hi, ${profile.name.firstName}</p>
          <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
          <p>Thank you</p>
        </div>
    `
    );
};

export const resetPass = async (payload: { id: string; newPassword: string }, token: string) => {
    const { id, newPassword } = payload;
    const user = await User.findOne({ id }, { id: 1 });

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
    }

    await verifyToken(token, envConfig.jwt.secret as string);

    const password = await hash(newPassword, Number(envConfig.bcrypt_salt_round));

    await User.updateOne({ id }, { password });
};
