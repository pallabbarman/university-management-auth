/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
import { compare, hash } from 'bcrypt';
import envConfig from 'configs/env.config';
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from 'types/user';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
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
            select: 0,
        },
        needsChangePassword: {
            type: Boolean,
            required: true,
            default: true,
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

userSchema.methods.isUserExist = async function (id: string): Promise<Partial<IUser | null>> {
    const user = await User.findOne(
        { id },
        {
            id: 1,
            password: 1,
            role: 1,
            needsChangePassword: 1,
        }
    );

    return user;
};

userSchema.methods.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    const isMatched = await compare(givenPassword, savedPassword);

    return isMatched;
};

userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, Number(envConfig.bcrypt_salt_round));

    next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
