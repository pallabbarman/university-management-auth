/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

export const createToken = (
    payload: Record<string, unknown>,
    secret: Secret,
    expireTime: string
): string =>
    sign(payload, secret, {
        expiresIn: expireTime,
    });

export const verifyToken = (token: string, secret: Secret): JwtPayload =>
    verify(token, secret) as JwtPayload;

export const createResetToken = (payload: any, secret: Secret, expireTime: string): string =>
    sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: expireTime,
    });
