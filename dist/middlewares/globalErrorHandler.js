"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
const env_config_1 = __importDefault(require("../configs/env.config"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const logger_1 = require("../utils/logger");
const zod_1 = require("zod");
const globalErrorHandlers = (err, req, res, next) => {
    env_config_1.default.env === 'development'
        ? console.log('globalErrorHandler ~', err)
        : logger_1.errorLogger.error('globalErrorHandler ~', err);
    let statusCode = 500;
    let message = 'Internal server error!';
    let errorMessages = [];
    if (err?.name === 'ValidationError') {
        const error = (0, handleValidationError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err?.name === 'CastError') {
        const error = (0, handleCastError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err instanceof zod_1.ZodError) {
        const error = (0, handleZodError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err instanceof apiError_1.default) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessages = err?.message
            ? [
                {
                    path: '',
                    message: err?.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorMessages = err?.message
            ? [
                {
                    path: '',
                    message: err?.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: env_config_1.default.env !== 'production' ? err?.stack : undefined,
    });
};
exports.default = globalErrorHandlers;
