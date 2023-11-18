"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartmentFromEvent = exports.updateDepartmentFromEvent = exports.createDepartmentFromEvent = exports.removeDepartment = exports.editDepartment = exports.singleDepartment = exports.newDepartment = exports.allDepartments = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const department_1 = require("../constants/department");
const academicFaculty_model_1 = __importDefault(require("../models/academicFaculty.model"));
const department_model_1 = __importDefault(require("../models/department.model"));
const pagination_1 = __importDefault(require("../utils/pagination"));
const allDepartments = async (filters, paginationOptions) => {
    const { limit, page, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: department_1.departmentSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $paginationOptions: 'i',
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
    const result = await department_model_1.default.find(whereConditions)
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await department_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allDepartments = allDepartments;
const newDepartment = async (payload) => {
    const result = (await department_model_1.default.create(payload)).populate('academicFaculty');
    return result;
};
exports.newDepartment = newDepartment;
const singleDepartment = async (id) => {
    const result = await department_model_1.default.findById(id).populate('academicFaculty');
    return result;
};
exports.singleDepartment = singleDepartment;
const editDepartment = async (id, payload) => {
    const result = await department_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('academicFaculty');
    return result;
};
exports.editDepartment = editDepartment;
const removeDepartment = async (id) => {
    const result = await department_model_1.default.findByIdAndDelete(id);
    return result;
};
exports.removeDepartment = removeDepartment;
const createDepartmentFromEvent = async (e) => {
    const academicFaculty = await academicFaculty_model_1.default.findOne({ syncId: e.academicFacultyId });
    const payload = {
        title: e.title,
        academicFaculty: academicFaculty?._id,
        syncId: e.id,
    };
    await department_model_1.default.create(payload);
};
exports.createDepartmentFromEvent = createDepartmentFromEvent;
const updateDepartmentFromEvent = async (e) => {
    const academicFaculty = await academicFaculty_model_1.default.findOne({ syncId: e.academicFacultyId });
    const payload = {
        title: e.title,
        academicFaculty: academicFaculty?._id,
    };
    await department_model_1.default.findOneAndUpdate({ syncId: e.id }, { $set: payload });
};
exports.updateDepartmentFromEvent = updateDepartmentFromEvent;
const deleteDepartmentFromEvent = async (syncId) => {
    await department_model_1.default.findOneAndDelete({ syncId });
};
exports.deleteDepartmentFromEvent = deleteDepartmentFromEvent;
