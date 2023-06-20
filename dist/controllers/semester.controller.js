"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSemester = exports.updateSemester = exports.getSingleSemester = exports.getAllSemesters = exports.newSemester = void 0;
/* eslint-disable comma-dangle */
const pagination_1 = __importDefault(require("../constants/pagination"));
const semester_1 = require("../constants/semester");
const http_status_1 = __importDefault(require("http-status"));
const semester_service_1 = require("../services/semester.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.newSemester = (0, catchAsync_1.default)(async (req, res) => {
    const { ...semesterData } = req.body;
    const result = await (0, semester_service_1.createSemester)(semesterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester is created successfully!',
        data: result,
    });
});
exports.getAllSemesters = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, semester_1.semesterFilterableFields);
    const paginationOption = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, semester_service_1.allSemesters)(filters, paginationOption);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters is retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleSemester = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, semester_service_1.singleSemester)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester is retrieved successfully!',
        data: result,
    });
});
exports.updateSemester = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await (0, semester_service_1.editSemester)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester is updated successfully!',
        data: result,
    });
});
exports.deleteSemester = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, semester_service_1.removeSemester)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester is deleted successfully!',
        data: result,
    });
});
