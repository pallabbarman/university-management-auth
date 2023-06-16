"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
var env_config_1 = __importDefault(require("configs/env.config"));
var apiError_1 = __importDefault(require("errors/apiError"));
var handleCastError_1 = __importDefault(require("errors/handleCastError"));
var handleValidationError_1 = __importDefault(require("errors/handleValidationError"));
var handleZodError_1 = __importDefault(require("errors/handleZodError"));
var logger_1 = require("utils/logger");
var zod_1 = require("zod");
var globalErrorHandlers = function (err, req, res, next) {
    env_config_1.default.env === 'development'
        ? console.log('globalErrorHandler ~', err)
        : logger_1.errorLogger.error('globalErrorHandler ~', err);
    var statusCode = 500;
    var message = 'Internal server error!';
    var errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        var error = (0, handleValidationError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        var error = (0, handleCastError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err instanceof zod_1.ZodError) {
        var error = (0, handleZodError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err instanceof apiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: env_config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandlers;
