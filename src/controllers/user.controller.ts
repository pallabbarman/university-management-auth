import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createNewStudent } from 'services/user.service';
import { IUser } from 'types/user';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';

// eslint-disable-next-line import/prefer-default-export
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
