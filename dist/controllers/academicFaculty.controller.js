"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAcademicFaculty = exports.updateAcademicFaculty = exports.getSingleAcademicFaculty = exports.getAllAcademicFaculties = exports.createAcademicFaculty = void 0;
/* eslint-disable comma-dangle */
const academicFaculty_1 = require("../constants/academicFaculty");
const pagination_1 = __importDefault(require("../constants/pagination"));
const http_status_1 = __importDefault(require("http-status"));
const academicFaculty_service_1 = require("../services/academicFaculty.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.createAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { ...facultyData } = req.body;
    const result = await (0, academicFaculty_service_1.newAcademicFaculty)(facultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Faculty created successfully!',
        data: result,
    });
});
exports.getAllAcademicFaculties = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, academicFaculty_1.academicFacultyFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, academicFaculty_service_1.allAcademicFaculties)(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Faculties data retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, academicFaculty_service_1.singleAcademicFaculty)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Faculty fetched successfully',
        data: result,
    });
});
exports.updateAcademicFaculty = (0, catchAsync_1.default)((0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await (0, academicFaculty_service_1.editAcademicFaculty)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Faculty updated successfully!',
        data: result,
    });
}));
exports.deleteAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, academicFaculty_service_1.removeAcademicFaculty)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Faculty deleted successfully!',
        data: result,
    });
});
