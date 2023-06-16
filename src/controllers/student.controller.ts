/* eslint-disable object-curly-newline */
import paginationFields from 'constants/pagination';
import { studentFilterableFields } from 'constants/student';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { allStudents, editStudent, removeStudent, singleStudent } from 'services/student.service';
import { IStudent } from 'types/students';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const getAllStudents = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await allStudents(filters, paginationOptions);

    sendResponse<IStudent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await singleStudent(id);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrieved successfully!',
        data: result,
    });
});

export const updateStudent = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await editStudent(id, updatedData);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student updated successfully !',
        data: result,
    });
});

export const deleteStudent = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await removeStudent(id);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student deleted successfully!',
        data: result,
    });
});
