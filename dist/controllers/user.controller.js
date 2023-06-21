"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.createFaculty = exports.createStudent = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("../services/user.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.createStudent = (0, catchAsync_1.default)(async (req, res) => {
    const { student, ...user } = req.body;
    const result = await (0, user_service_1.createNewStudent)(student, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student created successfully!',
        data: result,
    });
});
exports.createFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { faculty, ...userData } = req.body;
    const result = await (0, user_service_1.createNewFaculty)(faculty, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty created successfully!',
        data: result,
    });
});
exports.createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { admin, ...adminData } = req.body;
    const result = await (0, user_service_1.createNewAdmin)(admin, adminData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin created successfully!',
        data: result,
    });
});
