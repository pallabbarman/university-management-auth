import path from 'path';
import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
            level: 'info',
        }),
    ],
});

export const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
            level: 'error',
        }),
    ],
});
