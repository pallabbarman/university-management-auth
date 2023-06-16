"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterFilterableFields = exports.semesterSearchableFields = exports.semesterTitleCodeMapper = exports.semesterMonths = exports.semesterCodes = exports.semesterTitles = void 0;
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
