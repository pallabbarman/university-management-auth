"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getSingleDepartment = exports.getAllDepartments = exports.createDepartment = void 0;
const department_1 = require("../constants/department");
const pagination_1 = __importDefault(require("../constants/pagination"));
const http_status_1 = __importDefault(require("http-status"));
const department_service_1 = require("../services/department.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.createDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const { ...departmentData } = req.body;
    const result = await (0, department_service_1.newDepartment)(departmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Department created successfully',
        data: result,
    });
});
exports.getAllDepartments = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, department_1.departmentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, department_service_1.allDepartments)(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Departments fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, department_service_1.singleDepartment)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Department fetched successfully',
        data: result,
    });
});
exports.updateDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, department_service_1.editDepartment)(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Department updated successfully',
        data: result,
    });
});
exports.deleteDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, department_service_1.removeDepartment)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Department deleted successfully',
        data: result,
    });
});
