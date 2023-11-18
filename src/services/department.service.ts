/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
import { departmentSearchableFields } from 'constants/department';
import AcademicFaculty from 'models/academicFaculty.model';
import Department from 'models/department.model';
import { SortOrder } from 'mongoose';
import {
    DepartmentCreatedEvent,
    DepartmentUpdatedEvent,
    IDepartment,
    IDepartmentFilters,
} from 'types/department';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';

export const allDepartments = async (
    filters: IDepartmentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDepartment[]>> => {
    const { limit, page, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: departmentSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $paginationOptions: 'i',
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

    const result = await Department.find(whereConditions)
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Department.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const newDepartment = async (payload: IDepartment): Promise<IDepartment | null> => {
    const result = (await Department.create(payload)).populate('academicFaculty');
    return result;
};

export const singleDepartment = async (id: string): Promise<IDepartment | null> => {
    const result = await Department.findById(id).populate('academicFaculty');
    return result;
};

export const editDepartment = async (
    id: string,
    payload: Partial<IDepartment>
): Promise<IDepartment | null> => {
    const result = await Department.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('academicFaculty');
    return result;
};

export const removeDepartment = async (id: string): Promise<IDepartment | null> => {
    const result = await Department.findByIdAndDelete(id);
    return result;
};

export const createDepartmentFromEvent = async (e: DepartmentCreatedEvent): Promise<void> => {
    const academicFaculty = await AcademicFaculty.findOne({ syncId: e.academicFacultyId });
    const payload = {
        title: e.title,
        academicFaculty: academicFaculty?._id,
        syncId: e.id,
    };

    await Department.create(payload);
};

export const updateDepartmentFromEvent = async (e: DepartmentUpdatedEvent): Promise<void> => {
    const academicFaculty = await AcademicFaculty.findOne({ syncId: e.academicFacultyId });
    const payload = {
        title: e.title,
        academicFaculty: academicFaculty?._id,
    };

    await Department.findOneAndUpdate({ syncId: e.id }, { $set: payload });
};

export const deleteDepartmentFromEvent = async (syncId: string): Promise<void> => {
    await Department.findOneAndDelete({ syncId });
};
