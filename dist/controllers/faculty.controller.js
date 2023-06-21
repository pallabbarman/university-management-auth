"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaculty = exports.updateFaculty = exports.getSingleFaculty = exports.getAllFaculties = void 0;
/* eslint-disable object-curly-newline */
const faculty_1 = require("../constants/faculty");
const pagination_1 = __importDefault(require("../constants/pagination"));
const http_status_1 = __importDefault(require("http-status"));
const faculty_service_1 = require("../services/faculty.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.getAllFaculties = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, faculty_1.facultyFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, faculty_service_1.allFaculties)(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculties retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, faculty_service_1.singleFaculty)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty retrieved successfully !',
        data: result,
    });
});
exports.updateFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await (0, faculty_service_1.editFaculty)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty updated successfully !',
        data: result,
    });
});
exports.deleteFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, faculty_service_1.removeFaculty)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty deleted successfully !',
        data: result,
    });
});
