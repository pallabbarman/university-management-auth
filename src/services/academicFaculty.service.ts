/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { academicFacultySearchableFields } from 'constants/academicFaculty';
import AcademicFaculty from 'models/academicFaculty.model';
import { SortOrder } from 'mongoose';
import {
    AcademicFacultyCreatedEvent,
    AcademicFacultyUpdatedEvent,
    IAcademicFaculty,
    IAcademicFacultyFilters,
} from 'types/academicFaculty';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';

export const newAcademicFaculty = async (
    payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.create(payload);
    return result;
};

export const allAcademicFaculties = async (
    filters: IAcademicFacultyFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: academicFacultySearchableFields.map((field) => ({
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

    const result = await AcademicFaculty.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await AcademicFaculty.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const singleAcademicFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findById(id);
    return result;
};

export const editAcademicFaculty = async (
    id: string,
    payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const removeAcademicFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findByIdAndDelete(id);
    return result;
};

export const createAcademicFacultyFromEvent = async (
    e: AcademicFacultyCreatedEvent
): Promise<void> => {
    await AcademicFaculty.create({
        syncId: e.id,
        title: e.title,
    });
};

export const updateAcademicFacultyFromEvent = async (
    e: AcademicFacultyUpdatedEvent
): Promise<void> => {
    await AcademicFaculty.findOneAndUpdate(
        { syncId: e.id },
        {
            $set: {
                title: e.title,
            },
        }
    );
};

export const deleteAcademicFacultyFromEvent = async (syncId: string): Promise<void> => {
    await AcademicFaculty.findOneAndDelete({ syncId });
};
