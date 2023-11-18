import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty';

export type IDepartment = {
    title: string;
    academicFaculty: Types.ObjectId | IAcademicFaculty;
    syncId: string;
};

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;

export type IDepartmentFilters = {
    searchTerm?: string;
    academicFaculty?: Types.ObjectId;
};

export type DepartmentCreatedEvent = {
    id: string;
    title: string;
    academicFacultyId: string;
};

export type DepartmentUpdatedEvent = {
    id: string;
    title: string;
    academicFacultyId: string;
};

export type DepartmentDeletedEvent = {
    id: string;
};
