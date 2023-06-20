"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getSingleStudent = exports.getAllStudents = void 0;
/* eslint-disable object-curly-newline */
const pagination_1 = __importDefault(require("../constants/pagination"));
const student_1 = require("../constants/student");
const http_status_1 = __importDefault(require("http-status"));
const student_service_1 = require("../services/student.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.getAllStudents = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, student_1.studentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, student_service_1.allStudents)(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Students retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleStudent = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, student_service_1.singleStudent)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student retrieved successfully!',
        data: result,
    });
});
exports.updateStudent = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await (0, student_service_1.editStudent)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student updated successfully !',
        data: result,
    });
});
exports.deleteStudent = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, student_service_1.removeStudent)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student deleted successfully!',
        data: result,
    });
});
