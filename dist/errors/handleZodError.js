"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var handleZodError = function (error) {
    var errors = error.issues.map(function (issue) { return ({
        path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
        message: issue === null || issue === void 0 ? void 0 : issue.message,
    }); });
    var statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode: statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};
exports.default = handleZodError;
