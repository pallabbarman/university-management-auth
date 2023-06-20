import { Model, Types } from 'mongoose';
import { IFaculty } from './faculty';
import { IStudent } from './students';

export interface IUser {
    id: string;
    role: string;
    password: string;
    student?: Types.ObjectId | IStudent;
    faculty?: Types.ObjectId | IFaculty;
    admin?: Types.ObjectId; // | IAdmin;
}

export type UserModel = Model<IUser, Record<string, unknown>>;

// eslint-disable-next-line no-shadow
export enum USER_ROLE {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    STUDENT = 'student',
    FACULTY = 'faculty',
}
