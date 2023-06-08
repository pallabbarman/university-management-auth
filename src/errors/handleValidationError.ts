/* eslint-disable comma-dangle */
import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { IGenericErrorMessage, IGenericErrorResponse } from 'types/errors';

const handleValidationError = (error: Error.ValidationError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
        (ele: Error.ValidatorError | Error.CastError) => ({
            path: ele?.path,
            message: ele?.message,
        })
    );

    const statusCode = httpStatus.BAD_REQUEST;

    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};

export default handleValidationError;
