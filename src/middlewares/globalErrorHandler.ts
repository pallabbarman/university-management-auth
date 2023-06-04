import envConfig from 'configs/env.config';
import handleValidationError from 'errors/handleValidationError';
import { NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from 'types/errors';

const globalErrorHandlers = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = 'Internal server error!';
    const errorMessages: IGenericErrorMessage[] = [];

    if (err?.name === 'validationError') {
        const error = handleValidationError(err);
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
