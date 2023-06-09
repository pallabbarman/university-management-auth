/* eslint-disable comma-dangle */
import paginationFields from 'constants/pagination';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { allSemesters, createSemester } from 'services/semester.service';
import { ISemester } from 'types/semester';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const newSemester = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...semesterData } = req.body;
    const result = await createSemester(semesterData);

    sendResponse<ISemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester is created successfully!',
        data: result,
    });

    next();
});

export const getAllSemesters = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const paginationOption = pick(req.query, paginationFields);

        const result = await allSemesters(paginationOption);

        sendResponse<ISemester[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester is retrieved successfully!',
            meta: result.meta,
            data: result.data,
        });

        next();
    }
);
