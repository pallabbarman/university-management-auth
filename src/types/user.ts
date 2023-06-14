import { Model } from 'mongoose';

export interface IUser {
    id: string;
    role: string;
    password: string;
}

export type UserModel = Model<IUser, Record<string, unknown>>;

// eslint-disable-next-line no-shadow
export enum USER_ROLE {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    STUDENT = 'student',
    FACULTY = 'faculty',
}
