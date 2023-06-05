import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import handleValidationError from 'errors/handleValidationError';
import { ErrorRequestHandler } from 'express';
import { errorLogger } from 'shared/logger';
import { IGenericErrorMessage } from 'types/errors';

const globalErrorHandlers: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal server error!';
    let errorMessages: IGenericErrorMessage[] = [];

    // eslint-disable-next-line no-unused-expressions
    envConfig.env === 'development'
        ? console.log('globalErrorHandler ~', err)
        : errorLogger.error('globalErrorHandler ~', err);

    if (err?.name === 'validationError') {
        const error = handleValidationError(err);
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

    res.send(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: envConfig.env !== 'production' ? err?.stack : undefined,
    });

    next();
};

export default globalErrorHandlers;
