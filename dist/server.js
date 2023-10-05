"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./utils/logger");
const redis_1 = __importDefault(require("./utils/redis"));
const app_1 = __importDefault(require("./app"));
const db_config_1 = __importDefault(require("./configs/db.config"));
const env_config_1 = __importDefault(require("./configs/env.config"));
process.on('uncaughtException', (error) => {
    logger_1.errorLogger.error(error);
    process.exit(1);
});
let server;
const startServer = async () => {
    await (0, redis_1.default)();
    await (0, db_config_1.default)();
    server = app_1.default.listen(env_config_1.default.port, () => {
        logger_1.logger.info(`Server running on port ${env_config_1.default.port || 5001}`);
    });
    process.on('unhandledRejection', (error) => {
        if (server) {
            server.close(() => {
                logger_1.errorLogger.error(error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
};
startServer();
