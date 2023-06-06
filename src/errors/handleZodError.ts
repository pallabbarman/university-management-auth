import { IGenericErrorResponse } from 'types/common';
import { IGenericErrorMessage } from 'types/errors';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => ({
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
    }));

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};
export default handleZodError;
