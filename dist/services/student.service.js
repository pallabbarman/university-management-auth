"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStudent = exports.editStudent = exports.singleStudent = exports.allStudents = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const student_1 = require("../constants/student");
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const student_model_1 = __importDefault(require("../models/student.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = require("mongoose");
const pagination_1 = __importDefault(require("../utils/pagination"));
const allStudents = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: student_1.studentSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await student_model_1.default.find(whereConditions)
        .populate('semester')
        .populate('department')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await student_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allStudents = allStudents;
const singleStudent = async (id) => {
    const result = await student_model_1.default.findOne({ id })
        .populate('semester')
        .populate('department')
        .populate('academicFaculty');
    return result;
};
exports.singleStudent = singleStudent;
const editStudent = async (id, payload) => {
    const isExist = await student_model_1.default.findOne({ id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const { name, guardian, localGuardian, ...studentData } = payload;
    const updatedStudentData = { ...studentData };
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach((key) => {
            const guardianKey = `guardian.${key}`;
            updatedStudentData[guardianKey] = guardian[key];
        });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach((key) => {
            const localGuardianKey = `localGuardian.${key}`;
            updatedStudentData[localGuardianKey] =
                localGuardian[key];
        });
    }
    const result = await student_model_1.default.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
};
exports.editStudent = editStudent;
const removeStudent = async (id) => {
    const isExist = await student_model_1.default.findOne({ id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // delete student first
        const student = await student_model_1.default.findOneAndDelete({ id }, { session });
        if (!student) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Failed to delete student');
        }
        // delete user
        await user_model_1.default.deleteOne({ id });
        session.commitTransaction();
        session.endSession();
        return student;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
};
exports.removeStudent = removeStudent;
