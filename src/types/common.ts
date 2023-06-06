import { IGenericErrorMessage } from './errors';

export interface IGenericErrorResponse {
    statusCode: number;
    message: string;
    errorMessage: IGenericErrorMessage[];
}
