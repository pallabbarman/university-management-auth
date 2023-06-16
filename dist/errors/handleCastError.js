"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var handleCastError = function (error) {
    var errors = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];
    var statusCode = http_status_1.default.NOT_FOUND;
    return {
        statusCode: statusCode,
        message: 'Cast Error',
        errorMessage: errors,
    };
};
exports.default = handleCastError;
