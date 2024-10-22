/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { EVENT_STUDENT_UPDATED, studentSearchableFields } from 'constants/student';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import Student from 'models/student.model';
import User from 'models/user.model';
import { SortOrder, startSession } from 'mongoose';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import { IStudent, IStudentFilters } from 'types/students';
import calculatePagination from 'utils/pagination';
import { RedisClient } from 'utils/redis';

export const allStudents = async (
    filters: IStudentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: studentSearchableFields.map((field) => ({
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

    const result = await Student.find(whereConditions)
        .populate('semester')
        .populate('department')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Student.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const singleStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findOne({ id })
        .populate('semester')
        .populate('department')
        .populate('academicFaculty');
    return result;
};

export const editStudent = async (
    id: string,
    payload: Partial<IStudent>
): Promise<IStudent | null> => {
    const isExist = await Student.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
    }

    const { name, guardian, localGuardian, ...studentData } = payload;

    const updatedStudentData: Partial<IStudent> = { ...studentData };

    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}` as keyof Partial<IStudent>;
            (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach((key) => {
            const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
            (updatedStudentData as any)[guardianKey] = guardian[key as keyof typeof guardian];
        });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach((key) => {
            const localGuardianKey = `localGuardian.${key}` as keyof Partial<IStudent>;
            (updatedStudentData as any)[localGuardianKey] =
                localGuardian[key as keyof typeof localGuardian];
        });
    }

    const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    })
        .populate('semester')
        .populate('department')
        .populate('academicFaculty');

    if (result) {
        RedisClient.publish(EVENT_STUDENT_UPDATED, JSON.stringify(result));
    }

    return result;
};

export const removeStudent = async (id: string): Promise<IStudent | null> => {
    const isExist = await Student.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
    }

    const session = await startSession();

    try {
        session.startTransaction();
        // delete student first
        const student = await Student.findOneAndDelete({ id }, { session });

        if (!student) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete student');
        }

        // delete user
        await User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return student;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};
