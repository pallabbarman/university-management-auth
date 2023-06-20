import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createNewFaculty, createNewStudent } from 'services/user.service';
import { IUser } from 'types/user';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';

export const createStudent = catchAsync(async (req: Request, res: Response) => {
    const { student, ...user } = req.body;
    const result = await createNewStudent(student, user);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully!',
        data: result,
    });
});

export const createFaculty = catchAsync(async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await createNewFaculty(faculty, userData);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty created successfully!',
        data: result,
    });
});
