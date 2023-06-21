"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFaculty = exports.editFaculty = exports.singleFaculty = exports.allFaculties = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const faculty_1 = require("../constants/faculty");
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const faculty_model_1 = __importDefault(require("../models/faculty.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = require("mongoose");
const pagination_1 = __importDefault(require("../utils/pagination"));
const allFaculties = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: faculty_1.facultySearchableFields.map((field) => ({
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
    const result = await faculty_model_1.default.find(whereConditions)
        .populate('department')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await faculty_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allFaculties = allFaculties;
const singleFaculty = async (id) => {
    const result = await faculty_model_1.default.findOne({ id }).populate('department').populate('academicFaculty');
    return result;
};
exports.singleFaculty = singleFaculty;
const editFaculty = async (id, payload) => {
    const isExist = await faculty_model_1.default.findOne({ id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found!');
    }
    const { name, ...FacultyData } = payload;
    const updatedFacultyData = { ...FacultyData };
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedFacultyData[nameKey] = name[key];
        });
    }
    const result = await faculty_model_1.default.findOneAndUpdate({ id }, updatedFacultyData, {
        new: true,
    });
    return result;
};
exports.editFaculty = editFaculty;
const removeFaculty = async (id) => {
    // check if the faculty is exist
    const isExist = await faculty_model_1.default.findOne({ id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found !');
    }
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // delete faculty first
        const faculty = await faculty_model_1.default.findOneAndDelete({ id }, { session });
        if (!faculty) {
            throw new apiError_1.default(404, 'Failed to delete faculty!');
        }
        // delete user
        await user_model_1.default.deleteOne({ id });
        session.commitTransaction();
        session.endSession();
        return faculty;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
};
exports.removeFaculty = removeFaculty;
