/* eslint-disable comma-dangle */
import { Error } from 'mongoose';
import { IGenericErrorResponse } from 'types/common';
import { IGenericErrorMessage } from 'types/errors';

const handleValidationError = (error: Error.ValidationError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
        (ele: Error.ValidatorError | Error.CastError) => ({
            path: ele?.path,
            message: ele?.message,
        })
    );

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};

export default handleValidationError;
