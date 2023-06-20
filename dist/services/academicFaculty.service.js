"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAcademicFaculty = exports.editAcademicFaculty = exports.singleAcademicFaculty = exports.allAcademicFaculties = exports.newAcademicFaculty = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const academicFaculty_1 = require("../constants/academicFaculty");
const academicFaculty_model_1 = __importDefault(require("../models/academicFaculty.model"));
const pagination_1 = __importDefault(require("../utils/pagination"));
const newAcademicFaculty = async (payload) => {
    const result = await academicFaculty_model_1.default.create(payload);
    return result;
};
exports.newAcademicFaculty = newAcademicFaculty;
const allAcademicFaculties = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicFaculty_1.facultySearchableFields.map((field) => ({
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
    const result = await academicFaculty_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await academicFaculty_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allAcademicFaculties = allAcademicFaculties;
const singleAcademicFaculty = async (id) => {
    const result = await academicFaculty_model_1.default.findById(id);
    return result;
};
exports.singleAcademicFaculty = singleAcademicFaculty;
const editAcademicFaculty = async (id, payload) => {
    const result = await academicFaculty_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
exports.editAcademicFaculty = editAcademicFaculty;
const removeAcademicFaculty = async (id) => {
    const result = await academicFaculty_model_1.default.findByIdAndDelete(id);
    return result;
};
exports.removeAcademicFaculty = removeAcademicFaculty;
