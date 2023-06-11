import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import handleCastError from 'errors/handleCastError';
import handleValidationError from 'errors/handleValidationError';
import handleZodError from 'errors/handleZodError';
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from 'types/errors';
import { errorLogger } from 'utils/logger';
import { ZodError } from 'zod';

const globalErrorHandlers: ErrorRequestHandler = (err, req, res, next) => {
    // eslint-disable-next-line no-unused-expressions
    envConfig.env === 'development'
        ? console.log('globalErrorHandler ~', err)
        : errorLogger.error('globalErrorHandler ~', err);

    let statusCode = 500;
    let message = 'Internal server error!';
    let errorMessages: IGenericErrorMessage[] = [];

    if (err?.name === 'ValidationError') {
        const error = handleValidationError(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    } else if (err?.name === 'CastError') {
        const error = handleCastError(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    } else if (err instanceof ZodError) {
        const error = handleZodError(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    } else if (err instanceof ApiError) {
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
    } else if (err instanceof Error) {
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
        stack: envConfig.env !== 'production' ? err?.stack : undefined,
    });

    next();
};

export default globalErrorHandlers;
