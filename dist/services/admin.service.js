"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAdmin = exports.editAdmin = exports.singleAdmin = exports.allAdmins = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const admin_1 = require("../constants/admin");
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = require("mongoose");
const pagination_1 = __importDefault(require("../utils/pagination"));
const allAdmins = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: admin_1.adminSearchableFields.map((field) => ({
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
    const result = await admin_model_1.default.find(whereConditions)
        .populate('managementDepartment')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await admin_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allAdmins = allAdmins;
const singleAdmin = async (id) => {
    const result = await admin_model_1.default.findOne({ id }).populate('managementDepartment');
    return result;
};
exports.singleAdmin = singleAdmin;
const editAdmin = async (id, payload) => {
    const isExist = await admin_model_1.default.findOne({ id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found!');
    }
    const { name, ...adminData } = payload;
    const updatedStudentData = { ...adminData };
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    const result = await admin_model_1.default.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
};
exports.editAdmin = editAdmin;
const removeAdmin = async (id) => {
    const isExist = await admin_model_1.default.findOne({ id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found !');
    }
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const admin = await admin_model_1.default.findOneAndDelete({ id }, { session });
        if (!admin) {
            throw new apiError_1.default(404, 'Failed to delete admin');
        }
        // delete user
        await user_model_1.default.deleteOne({ id });
        session.commitTransaction();
        session.endSession();
        return admin;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
};
exports.removeAdmin = removeAdmin;
