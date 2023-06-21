"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteManagementDepartment = exports.updateManagementDepartment = exports.getSingleManagementDepartment = exports.getAllManagementDepartments = exports.createManagementDepartment = void 0;
/* eslint-disable comma-dangle */
const managementDepartment_1 = require("../constants/managementDepartment");
const pagination_1 = __importDefault(require("../constants/pagination"));
const http_status_1 = __importDefault(require("http-status"));
const managementDepartment_service_1 = require("../services/managementDepartment.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.createManagementDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const { ...departmentData } = req.body;
    const result = await (0, managementDepartment_service_1.newManageDepartment)(departmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department created successfully!',
        data: result,
    });
});
exports.getAllManagementDepartments = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, managementDepartment_1.managementDepartmentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, managementDepartment_service_1.allManagementDepartments)(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management departments retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleManagementDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, managementDepartment_service_1.singleManagementDepartment)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department retrieved successfully!',
        data: result,
    });
});
exports.updateManagementDepartment = (0, catchAsync_1.default)((0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await (0, managementDepartment_service_1.editManagementDepartment)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department updated successfully!',
        data: result,
    });
}));
exports.deleteManagementDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, managementDepartment_service_1.removeManagementDepartment)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department deleted successfully!',
        data: result,
    });
});
