/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from 'types/user';

const userSchema = new Schema<IUser>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
