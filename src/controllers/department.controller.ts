import { departmentFilterableFields } from 'constants/department';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
    allDepartments,
    editDepartment,
    newDepartment,
    removeDepartment,
    singleDepartment,
} from 'services/department.service';
import { IDepartment } from 'types/department';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const createDepartment = catchAsync(async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await newDepartment(departmentData);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department created successfully',
        data: result,
    });
});

export const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, departmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await allDepartments(filters, paginationOptions);

    sendResponse<IDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Departments fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await singleDepartment(id);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department fetched successfully',
        data: result,
    });
});

export const updateDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await editDepartment(id, req.body);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department updated successfully',
        data: result,
    });
});

export const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await removeDepartment(id);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department deleted successfully',
        data: result,
    });
});
