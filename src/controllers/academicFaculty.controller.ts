/* eslint-disable comma-dangle */
import { facultyFilterableFields } from 'constants/academicFaculty';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
    allAcademicFaculties,
    editAcademicFaculty,
    newAcademicFaculty,
    removeAcademicFaculty,
    singleAcademicFaculty,
} from 'services/academicFaculty.service';
import { IAcademicFaculty } from 'types/academicFaculty';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const createAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
    const { ...facultyData } = req.body;
    const result = await newAcademicFaculty(facultyData);
    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty created successfully!',
        data: result,
    });
});

export const getAllAcademicFaculties = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await allAcademicFaculties(filters, paginationOptions);

    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties data retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getSingleAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await singleAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty fetched successfully',
        data: result,
    });
});

export const updateAcademicFaculty = catchAsync(
    catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await editAcademicFaculty(id, updatedData);

        sendResponse<IAcademicFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculty updated successfully!',
            data: result,
        });
    })
);

export const deleteAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await removeAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty deleted successfully!',
        data: result,
    });
});
