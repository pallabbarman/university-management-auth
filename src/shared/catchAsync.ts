/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync =
    (fn: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };

export default catchAsync;
