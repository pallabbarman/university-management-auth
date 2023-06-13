import { Model } from 'mongoose';

export interface IFaculty {
    title: string;
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
    searchTerm?: string;
};
