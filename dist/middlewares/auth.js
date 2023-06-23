"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const env_config_1 = __importDefault(require("../configs/env.config"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtGenerator_1 = require("../utils/jwtGenerator");
const auth = (...roles) => async (req, res, next) => {
    try {
        // get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = (0, jwtGenerator_1.verifyToken)(token, env_config_1.default.jwt.secret);
        req.user = verifiedUser; // role , userId
        if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
