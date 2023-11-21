/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { EVENT_FACULTY_UPDATED, facultySearchableFields } from 'constants/faculty';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import Faculty from 'models/faculty.model';
import User from 'models/user.model';
import { SortOrder, startSession } from 'mongoose';
import { IFaculty, IFacultyFilters } from 'types/faculty';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';
import { RedisClient } from 'utils/redis';

export const singleFaculty = async (id: string): Promise<IFaculty | null> => {
    const result = await Faculty.findOne({ id }).populate('department').populate('academicFaculty');

    return result;
};
export const allFaculties = async (
    filters: IFacultyFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: facultySearchableFields.map((field) => ({
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

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Faculty.find(whereConditions)
        .populate('department')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Faculty.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
export const editFaculty = async (
    id: string,
    payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
    const isExist = await Faculty.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found!');
    }

    const { name, ...FacultyData } = payload;
    const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}` as keyof Partial<IFaculty>;
            (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
        new: true,
    })
        .populate('department')
        .populate('academicFaculty');

    if (result) {
        await RedisClient.publish(EVENT_FACULTY_UPDATED, JSON.stringify(result));
    }

    return result;
};

export const removeFaculty = async (id: string): Promise<IFaculty | null> => {
    // check if the faculty is exist
    const isExist = await Faculty.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }

    const session = await startSession();

    try {
        session.startTransaction();
        // delete faculty first
        const faculty = await Faculty.findOneAndDelete({ id }, { session });
        if (!faculty) {
            throw new ApiError(404, 'Failed to delete faculty!');
        }
        // delete user
        await User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return faculty;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};
