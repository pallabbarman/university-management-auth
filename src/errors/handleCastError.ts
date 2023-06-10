import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { IGenericErrorMessage } from 'types/errors';

const handleCastError = (error: Error.CastError) => {
    const errors: IGenericErrorMessage[] = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];

    const statusCode = httpStatus.NOT_FOUND;

    return {
        statusCode,
        message: 'Cast Error',
        errorMessage: errors,
    };
};

export default handleCastError;
