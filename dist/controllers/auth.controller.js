"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.changePassword = exports.refreshToken = exports.loginUser = void 0;
const env_config_1 = __importDefault(require("../configs/env.config"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("../services/auth.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const { ...loginData } = req.body;
    const result = await (0, auth_service_1.signInUser)(loginData);
    const { refreshToken, ...others } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: env_config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User login successfully!',
        data: others,
    });
});
exports.refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { token } = req.cookies;
    const result = await (0, auth_service_1.reFreshToken)(token);
    // set refresh token into cookie
    const cookieOptions = {
        secure: env_config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', token, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Refresh token generate successfully!',
        data: result,
    });
});
exports.changePassword = (0, catchAsync_1.default)(async (req, res) => {
    const { user } = req;
    const { ...passwordData } = req.body;
    await (0, auth_service_1.passwordChange)(user, passwordData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password Changed successfully!',
    });
});
exports.forgotPassword = (0, catchAsync_1.default)(async (req, res) => {
    await (0, auth_service_1.forgotPass)(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Check your email!',
    });
});
exports.resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.headers.authorization || '';
    await (0, auth_service_1.resetPass)(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Account recovered!',
    });
});
