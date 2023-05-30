/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { IUser } from 'types/user';

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
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>('User', userSchema);

export default User;
