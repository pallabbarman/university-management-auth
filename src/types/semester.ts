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
    year: number;
    code: SemesterCodes;
    startMonth: SemesterMonths;
    endMonth: SemesterMonths;
    syncId: string;
}

export type SemesterModel = Model<ISemester, Record<string, unknown>>;

export type SemesterFilters = {
    searchTerm?: string;
};

export interface ISemesterEvents extends ISemester {
    id: string;
}
