import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { createSemester } from 'services/semester.service';
import catchAsync from 'shared/catchAsync';
import sendResponse from 'shared/sendResponse';

// eslint-disable-next-line import/prefer-default-export
export const newSemester = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...semesterData } = req.body;
    const result = await createSemester(semesterData);

    next();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester is created successfully!',
        data: result,
    });
});
