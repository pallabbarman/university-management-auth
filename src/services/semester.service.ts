/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { semesterSearchableFields, semesterTitleCodeMapper } from 'constants/semester';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import Semester from 'models/semester.model';
import { SortOrder } from 'mongoose';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import { ISemester, SemesterFilters } from 'types/semester';
import calculatePagination from 'utils/pagination';

export const createSemester = async (payload: ISemester): Promise<ISemester> => {
    if (semesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
    }

    const result = await Semester.create(payload);

    return result;
};

export const allSemesters = async (
    filters: SemesterFilters,
    paginationOption: IPaginationOptions
): Promise<IGenericResponse<ISemester[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: semesterSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOption);

    const sortCondition: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const result = await Semester.find().sort(sortCondition).skip(skip).limit(limit);

    const total = await Semester.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
