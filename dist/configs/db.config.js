"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logger_1 = require("../utils/logger");
const env_config_1 = __importDefault(require("./env.config"));
const connectDB = async () => {
    try {
        await (0, mongoose_1.connect)(env_config_1.default.db_url);
        logger_1.logger.info('Database connected successfully!');
    }
    catch (error) {
        logger_1.errorLogger.error(`Failed to connect database ${error}`);
    }
};
exports.default = connectDB;
