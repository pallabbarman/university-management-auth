import User from 'models/user.model';
import { IUser } from 'types/user';

// eslint-disable-next-line import/prefer-default-export
export const createUser = async (user: IUser): Promise<IUser | null> => {
    const createdUser = await User.create(user);

    if (!createdUser) {
        throw new Error('Failed to created a new user!');
    }

    return createdUser;
};
