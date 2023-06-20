"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
const semester_1 = require("../constants/semester");
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const semesterSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        enum: semester_1.semesterTitles,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: semester_1.semesterCodes,
    },
    startMonth: {
        type: String,
        required: true,
        enum: semester_1.semesterMonths,
    },
    endMonth: {
        type: String,
        required: true,
        enum: semester_1.semesterMonths,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// handling same year and same semester issue
semesterSchema.pre('save', async function (next) {
    const isExist = await Semester.findOne({ title: this.title, year: this.year });
    if (isExist) {
        throw new apiError_1.default(http_status_1.default.CONFLICT, 'Semester is already exist!');
    }
    next();
});
const Semester = (0, mongoose_1.model)('Semester', semesterSchema);
exports.default = Semester;
