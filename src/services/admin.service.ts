/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { adminSearchableFields } from 'constants/admin';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import Admin from 'models/admin.model';
import User from 'models/user.model';
import { SortOrder, startSession } from 'mongoose';
import { IAdmin, IAdminFilters } from 'types/admin';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';

export const allAdmins = async (
    filters: IAdminFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: adminSearchableFields.map((field) => ({
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

    const result = await Admin.find(whereConditions)
        .populate('managementDepartment')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Admin.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const singleAdmin = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findOne({ id }).populate('managementDepartment');
    return result;
};

export const editAdmin = async (id: string, payload: Partial<IAdmin>): Promise<IAdmin | null> => {
    const isExist = await Admin.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!');
    }

    const { name, ...adminData } = payload;

    const updatedStudentData: Partial<IAdmin> = { ...adminData };

    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}` as keyof Partial<IAdmin>;
            (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    const result = await Admin.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
};

export const removeAdmin = async (id: string): Promise<IAdmin | null> => {
    const isExist = await Admin.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
    }

    const session = await startSession();

    try {
        session.startTransaction();

        const admin = await Admin.findOneAndDelete({ id }, { session });
        if (!admin) {
            throw new ApiError(404, 'Failed to delete admin');
        }
        // delete user
        await User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return admin;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};
