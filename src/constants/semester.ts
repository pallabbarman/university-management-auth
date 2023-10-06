import { SemesterCodes, SemesterMonths, SemesterTitles } from 'types/semester';

export const semesterTitles: SemesterTitles[] = ['Autumn', 'Summer', 'Fall'];

export const semesterCodes: SemesterCodes[] = ['01', '02', '03'];

export const semesterMonths: SemesterMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const semesterTitleCodeMapper: { [key: string]: string } = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};

export const semesterSearchableFields = ['title', 'code', 'year'];

export const semesterFilterableFields = ['searchTerm', 'title', 'code', 'year'];

export const EVENT_SEMESTER_CREATED = 'semester-created';
export const EVENT_SEMESTER_UPDATED = 'semester-updated';
export const EVENT_SEMESTER_DELETED = 'semester-deleted';
