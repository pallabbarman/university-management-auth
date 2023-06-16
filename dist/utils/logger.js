"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
var path_1 = __importDefault(require("path"));
var winston_1 = require("winston");
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf;
// custom logger format
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    var date = new Date(timestamp);
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return "".concat(date.toDateString(), " ").concat(hour, ":").concat(minutes, ":").concat(seconds, " [").concat(label, "] ").concat(level, ": ").concat(message);
});
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'debug' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'success-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '2d',
        }),
    ],
});
exports.errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'debug' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '2d',
        }),
    ],
});
