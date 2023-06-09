import { Model } from 'mongoose';

export type SemesterMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type SemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type SemesterCodes = '01' | '02' | '03';

export interface ISemester {
    title: SemesterTitles;
    year: string;
    code: SemesterCodes;
    startMonth: SemesterMonths;
    endMonth: SemesterMonths;
}

export type SemesterModel = Model<ISemester>;

export type SemesterFilters = {
    searchTerm?: string;
};
