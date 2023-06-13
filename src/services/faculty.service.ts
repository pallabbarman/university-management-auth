/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { facultySearchableFields } from 'constants/faculty';
import Faculty from 'models/faculty.model';
import { SortOrder } from 'mongoose';
import { IFaculty, IFacultyFilters } from 'types/faculty';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';

export const newFaculty = async (payload: IFaculty): Promise<IFaculty | null> => {
    const result = await Faculty.create(payload);
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

    const result = await Faculty.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);

    const total = await Faculty.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const singleFaculty = async (id: string): Promise<IFaculty | null> => {
    const result = await Faculty.findById(id);
    return result;
};

export const editFaculty = async (
    id: string,
    payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
    const result = await Faculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const removeFaculty = async (id: string): Promise<IFaculty | null> => {
    const result = await Faculty.findByIdAndDelete(id);
    return result;
};
