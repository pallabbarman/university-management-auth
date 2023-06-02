/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf } = format;

// custom logger format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: combine(label({ label: 'debug' }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                'logs',
                'winston',
                'successes',
                'success-%DATE%.log'
            ),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

export const errorLogger = createLogger({
    level: 'error',
    format: combine(label({ label: 'debug' }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
