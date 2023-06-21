/* eslint-disable func-names */
/* eslint-disable comma-dangle */
import { hash } from 'bcrypt';
import envConfig from 'configs/env.config';
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
        faculty: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
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

userSchema.pre('save', async function (next) {
    // hashing password
    this.password = await hash(this.password, Number(envConfig.bcrypt_salt_round));

    next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
