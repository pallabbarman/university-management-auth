"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeManagementDepartment = exports.editManagementDepartment = exports.singleManagementDepartment = exports.allManagementDepartments = exports.newManageDepartment = void 0;
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
const managementDepartment_1 = require("../constants/managementDepartment");
const managementDepartment_model_1 = __importDefault(require("../models/managementDepartment.model"));
const pagination_1 = __importDefault(require("../utils/pagination"));
const newManageDepartment = async (payload) => {
    const result = await managementDepartment_model_1.default.create(payload);
    return result;
};
exports.newManageDepartment = newManageDepartment;
const allManagementDepartments = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: managementDepartment_1.managementDepartmentSearchableFields.map((field) => ({
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
    const result = await managementDepartment_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await managementDepartment_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allManagementDepartments = allManagementDepartments;
const singleManagementDepartment = async (id) => {
    const result = await managementDepartment_model_1.default.findById(id);
    return result;
};
exports.singleManagementDepartment = singleManagementDepartment;
const editManagementDepartment = async (id, payload) => {
    const result = await managementDepartment_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
exports.editManagementDepartment = editManagementDepartment;
const removeManagementDepartment = async (id) => {
    const result = await managementDepartment_model_1.default.findByIdAndDelete(id);
    return result;
};
exports.removeManagementDepartment = removeManagementDepartment;
