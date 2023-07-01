import { IMeta } from './meta';

export interface IApiResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: IMeta;
    data?: T | null;
}

export interface IGenericResponse<T> {
    meta: IMeta;
    data: T;
}
