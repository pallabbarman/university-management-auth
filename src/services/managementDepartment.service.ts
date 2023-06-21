/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import { managementDepartmentSearchableFields } from 'constants/managementDepartment';
import ManagementDepartment from 'models/managementDepartment.model';
import { SortOrder } from 'mongoose';
import { IManagementDepartment, IManagementDepartmentFilters } from 'types/managementDepartment';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';

export const newManageDepartment = async (
    payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
    const result = await ManagementDepartment.create(payload);
    return result;
};

export const allManagementDepartments = async (
    filters: IManagementDepartmentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: managementDepartmentSearchableFields.map((field) => ({
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

    const result = await ManagementDepartment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await ManagementDepartment.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const singleManagementDepartment = async (
    id: string
): Promise<IManagementDepartment | null> => {
    const result = await ManagementDepartment.findById(id);
    return result;
};

export const editManagementDepartment = async (
    id: string,
    payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
    const result = await ManagementDepartment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const removeManagementDepartment = async (
    id: string
): Promise<IManagementDepartment | null> => {
    const result = await ManagementDepartment.findByIdAndDelete(id);
    return result;
};
