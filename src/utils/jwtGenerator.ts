/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { Secret, sign } from 'jsonwebtoken';

const createToken = (
    payload: Record<string, unknown>,
    secret: Secret,
    expireTime: string
): string =>
    sign(payload, secret, {
        expiresIn: expireTime,
    });

export default createToken;
