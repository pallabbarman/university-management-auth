import { Error } from 'mongoose';
import { IGenericErrorMessage } from 'types/errors';

const handleValidationError = (error: Error.ValidationError) => {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map((elem) => ({
        path: elem?.path,
        message: elem?.message,
    }));

    const statusCode = 400;

    return {};
};

export default handleValidationError;
