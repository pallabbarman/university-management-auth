import { USER_ROLE } from './user';

export interface ILogin {
    id: string;
    password: string;
}

export interface ILoginUserResponse {
    accessToken: string;
    refreshToken?: string;
    needsChangePassword: boolean | undefined;
}

export interface IRefreshTokenResponse {
    accessToken: string;
}

export interface IVerifiedLoginUser {
    userId: string;
    role: USER_ROLE;
}
