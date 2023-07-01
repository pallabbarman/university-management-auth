/* eslint-disable comma-dangle */
import { Response } from 'express';
import { IApiResponse } from 'types/response';

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    const responseData: IApiResponse<T> = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };

    res.status(data.statusCode).json(responseData);
};

export default sendResponse;
