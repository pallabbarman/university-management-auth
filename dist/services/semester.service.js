"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSemesterFromEvent = exports.updateSemesterFromEvent = exports.createSemesterFromEvent = exports.removeSemester = exports.editSemester = exports.singleSemester = exports.allSemesters = exports.createSemester = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const semester_1 = require("../constants/semester");
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const semester_model_1 = __importDefault(require("../models/semester.model"));
const pagination_1 = __importDefault(require("../utils/pagination"));
const createSemester = async (payload) => {
    if (semester_1.semesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid semester code!');
    }
    const result = await semester_model_1.default.create(payload);
    return result;
};
exports.createSemester = createSemester;
const allSemesters = async (filters, paginationOption) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: semester_1.semesterSearchableFields.map((field) => ({
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
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await semester_model_1.default.find(whereConditions).sort(sortCondition).skip(skip).limit(limit);
    const total = await semester_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allSemesters = allSemesters;
const singleSemester = async (id) => {
    const result = await semester_model_1.default.findById(id);
    return result;
};
exports.singleSemester = singleSemester;
const editSemester = async (id, payload) => {
    if (payload.title && payload.code && semester_1.semesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid semester code!');
    }
    const result = await semester_model_1.default.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};
exports.editSemester = editSemester;
const removeSemester = async (id) => {
    const result = await semester_model_1.default.findByIdAndDelete(id);
    return result;
};
exports.removeSemester = removeSemester;
const createSemesterFromEvent = async (event) => {
    await semester_model_1.default.create({
        title: event.title,
        year: event.year,
        code: event.code,
        startMonth: event.startMonth,
        endMonth: event.endMonth,
        syncId: event.id,
    });
};
exports.createSemesterFromEvent = createSemesterFromEvent;
const updateSemesterFromEvent = async (event) => {
    await semester_model_1.default.findOneAndUpdate({
        syncId: event.id,
    }, {
        $set: {
            title: event.title,
            year: event.year,
            code: event.code,
            startMonth: event.startMonth,
            endMonth: event.endMonth,
        },
    });
};
exports.updateSemesterFromEvent = updateSemesterFromEvent;
const deleteSemesterFromEvent = async (syncId) => {
    await semester_model_1.default.findOneAndDelete({
        syncId,
    });
};
exports.deleteSemesterFromEvent = deleteSemesterFromEvent;
