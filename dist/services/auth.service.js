"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPass = exports.forgotPass = exports.passwordChange = exports.reFreshToken = exports.signInUser = void 0;
/* eslint-disable comma-dangle */
const bcrypt_1 = require("bcrypt");
const env_config_1 = __importDefault(require("../configs/env.config"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const faculty_model_1 = __importDefault(require("../models/faculty.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_1 = require("../types/user");
const jwtGenerator_1 = require("../utils/jwtGenerator");
const sendResetMail_1 = __importDefault(require("../utils/sendResetMail"));
const signInUser = async (payload) => {
    const { id, password } = payload;
    const user = new user_model_1.default();
    let isPasswordMatched;
    const isUserExist = await user.isUserExist(id);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    if (isUserExist.password) {
        isPasswordMatched = await user.isPasswordMatched(password, isUserExist?.password);
    }
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect!');
    }
    const { id: userId, role, needsChangePassword } = isUserExist;
    // create access token
    const accessToken = (0, jwtGenerator_1.createToken)({ userId, role }, env_config_1.default.jwt.secret, env_config_1.default.jwt.expires_in);
    // create refresh token
    const refreshToken = (0, jwtGenerator_1.createToken)({ userId, role }, env_config_1.default.jwt.refresh_token, env_config_1.default.jwt.refresh_expire_in);
    return {
        accessToken,
        refreshToken,
        needsChangePassword,
    };
};
exports.signInUser = signInUser;
const reFreshToken = async (token) => {
    // verify token
    let verifiedToken = null;
    const user = new user_model_1.default();
    try {
        verifiedToken = (0, jwtGenerator_1.verifyToken)(token, env_config_1.default.jwt.refresh_token);
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token!');
    }
    const { userId } = verifiedToken;
    const isUserExist = await user.isUserExist(userId);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    const newAccessToken = (0, jwtGenerator_1.createToken)({
        id: isUserExist.id,
        role: isUserExist.role,
    }, env_config_1.default.jwt.secret, env_config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
};
exports.reFreshToken = reFreshToken;
const passwordChange = async (userToken, payload) => {
    const { oldPassword, newPassword } = payload;
    const { userId } = userToken;
    const user = new user_model_1.default();
    let isPasswordMatched;
    const isUserExist = await user_model_1.default.findOne({ id: userId }).select('+password');
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    if (isUserExist.password) {
        isPasswordMatched = await user.isPasswordMatched(oldPassword, isUserExist?.password);
    }
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect!');
    }
    isUserExist.password = newPassword;
    isUserExist.needsChangePassword = false;
    // updating using save()
    isUserExist.save();
};
exports.passwordChange = passwordChange;
const forgotPass = async (payload) => {
    const user = await user_model_1.default.findOne({ id: payload.id }, { id: 1, role: 1 });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist!');
    }
    let profile = null;
    if (user.role === user_1.USER_ROLE.ADMIN) {
        profile = await admin_model_1.default.findOne({ id: user.id });
    }
    else if (user.role === user_1.USER_ROLE.FACULTY) {
        profile = await faculty_model_1.default.findOne({ id: user.id });
    }
    else if (user.role === user_1.USER_ROLE.STUDENT) {
        profile = await student_model_1.default.findOne({ id: user.id });
    }
    if (!profile) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Profile not found!');
    }
    if (!profile.email) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Email not found!');
    }
    const passResetToken = await (0, jwtGenerator_1.createResetToken)({ id: user.id }, env_config_1.default.jwt.secret, '50m');
    const resetLink = `${env_config_1.default.resetlink}token=${passResetToken}`;
    console.log('profile: ', profile);
    await (0, sendResetMail_1.default)(profile.email, `
        <div>
          <p>Hi, ${profile.name.firstName}</p>
          <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
          <p>Thank you</p>
        </div>
    `);
};
exports.forgotPass = forgotPass;
const resetPass = async (payload, token) => {
    const { id, newPassword } = payload;
    const user = await user_model_1.default.findOne({ id }, { id: 1 });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    await (0, jwtGenerator_1.verifyToken)(token, env_config_1.default.jwt.secret);
    const password = await (0, bcrypt_1.hash)(newPassword, Number(env_config_1.default.bcrypt_salt_round));
    await user_model_1.default.updateOne({ id }, { password });
};
exports.resetPass = resetPass;
