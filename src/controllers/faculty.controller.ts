/* eslint-disable object-curly-newline */
import { facultyFilterableFields } from 'constants/faculty';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { allFaculties, editFaculty, removeFaculty, singleFaculty } from 'services/faculty.service';
import { IFaculty } from 'types/faculty';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await allFaculties(filters, paginationOptions);

    sendResponse<IFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await singleFaculty(id);

    sendResponse<IFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty retrieved successfully !',
        data: result,
    });
});

export const updateFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await editFaculty(id, updatedData);

    sendResponse<IFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty updated successfully !',
        data: result,
    });
});

export const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await removeFaculty(id);

    sendResponse<IFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty deleted successfully !',
        data: result,
    });
});
