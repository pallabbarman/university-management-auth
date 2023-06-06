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

export interface ISemester {
    title: 'Autumn' | 'Summer' | 'Fall';
    year: number;
    code: '01' | '02' | '03';
    startMonth: SemesterMonths;
    endMonth: SemesterMonths;
}

export type SemesterModel = Model<ISemester, Record<string, unknown>>;
