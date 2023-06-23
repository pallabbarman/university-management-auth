/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { verifyToken } from 'utils/jwtGenerator';

const auth =
    (...roles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // get authorization token
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
            }

            // verify token
            let verifiedUser = null;

            verifiedUser = verifyToken(token, envConfig.jwt.secret as Secret);

            req.user = verifiedUser; // role , userId

            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
            }
            next();
        } catch (error) {
            next(error);
        }
    };

export default auth;
