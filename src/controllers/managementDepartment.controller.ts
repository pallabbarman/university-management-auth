/* eslint-disable comma-dangle */
import { managementDepartmentFilterableFields } from 'constants/managementDepartment';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
    allManagementDepartments,
    editManagementDepartment,
    newManageDepartment,
    removeManagementDepartment,
    singleManagementDepartment,
} from 'services/managementDepartment.service';
import { IManagementDepartment } from 'types/managementDepartment';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const createManagementDepartment = catchAsync(async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await newManageDepartment(departmentData);

    sendResponse<IManagementDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management department created successfully!',
        data: result,
    });
});

export const getAllManagementDepartments = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await allManagementDepartments(filters, paginationOptions);

    sendResponse<IManagementDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management departments retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getSingleManagementDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await singleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management department retrieved successfully!',
        data: result,
    });
});

export const updateManagementDepartment = catchAsync(
    catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await editManagementDepartment(id, updatedData);

        sendResponse<IManagementDepartment>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Management department updated successfully!',
            data: result,
        });
    })
);

export const deleteManagementDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await removeManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management department deleted successfully!',
        data: result,
    });
});
