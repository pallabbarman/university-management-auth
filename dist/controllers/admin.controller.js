"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.getSingleAdmin = exports.getAllAdmins = void 0;
/* eslint-disable object-curly-newline */
const admin_1 = require("../constants/admin");
const pagination_1 = __importDefault(require("../constants/pagination"));
const http_status_1 = __importDefault(require("http-status"));
const admin_service_1 = require("../services/admin.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.getAllAdmins = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, admin_1.adminFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, admin_service_1.allAdmins)(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admins retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, admin_service_1.singleAdmin)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin retrieved successfully!',
        data: result,
    });
});
exports.updateAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await (0, admin_service_1.editAdmin)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin updated successfully!',
        data: result,
    });
});
exports.deleteAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, admin_service_1.removeAdmin)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin deleted successfully!',
        data: result,
    });
});
