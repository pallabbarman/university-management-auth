import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import Semester from 'models/semester.model';
import { semesterTitleCodeMapper } from 'shared/semester.constant';
import { ISemester } from 'types/semester';

// eslint-disable-next-line import/prefer-default-export
export const createSemester = async (payload: ISemester): Promise<ISemester> => {
    if (semesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
    }

    const result = await Semester.create(payload);

    return result;
};
