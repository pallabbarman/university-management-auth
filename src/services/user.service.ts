/* eslint-disable no-param-reassign */
import envConfig from 'configs/env.config';
import User from 'models/users.model';
import { IUser } from 'types/user';
import { generateUserId } from 'utils/users.utils';

// eslint-disable-next-line import/prefer-default-export
export const createUser = async (user: IUser): Promise<IUser | null> => {
    const id = await generateUserId();

    user.id = id;

    if (!user.password) {
        user.password = envConfig.default_user_pass as string;
    }

    const createdUser = await User.create(user);

    if (!createdUser) {
        throw new Error('Failed to created a new user!');
    }

    return createdUser;
};
