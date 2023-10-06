"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_SEMESTER_DELETED = exports.EVENT_SEMESTER_UPDATED = exports.EVENT_SEMESTER_CREATED = exports.semesterFilterableFields = exports.semesterSearchableFields = exports.semesterTitleCodeMapper = exports.semesterMonths = exports.semesterCodes = exports.semesterTitles = void 0;
exports.semesterTitles = ['Autumn', 'Summer', 'Fall'];
exports.semesterCodes = ['01', '02', '03'];
exports.semesterMonths = [
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
exports.semesterTitleCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
exports.semesterSearchableFields = ['title', 'code', 'year'];
exports.semesterFilterableFields = ['searchTerm', 'title', 'code', 'year'];
exports.EVENT_SEMESTER_CREATED = 'semester-created';
exports.EVENT_SEMESTER_UPDATED = 'semester-updated';
exports.EVENT_SEMESTER_DELETED = 'semester-deleted';
