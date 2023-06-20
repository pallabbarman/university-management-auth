"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const http_status_1 = __importDefault(require("http-status"));
const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((ele) => ({
        path: ele?.path,
        message: ele?.message,
    }));
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};
exports.default = handleValidationError;
