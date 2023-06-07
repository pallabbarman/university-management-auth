import Semester from 'models/semester.model';
import { ISemester } from 'types/semester';

// eslint-disable-next-line import/prefer-default-export
export const createSemester = async (payload: ISemester): Promise<ISemester> => {
    const result = await Semester.create(payload);

    return result;
};
