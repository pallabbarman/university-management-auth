import httpStatus from 'http-status';
import { IGenericErrorMessage, IGenericErrorResponse } from 'types/errors';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => ({
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
    }));

    const statusCode = httpStatus.BAD_REQUEST;

    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};
export default handleZodError;
