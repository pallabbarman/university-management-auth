import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty';

export type IDepartment = {
    title: string;
    academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;

export type IDepartmentFilters = {
    searchTerm?: string;
    academicFaculty?: Types.ObjectId;
};
