/* eslint-disable object-curly-newline */
import { adminFilterableFields } from 'constants/admin';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { allAdmins, editAdmin, removeAdmin, singleAdmin } from 'services/admin.service';
import { IAdmin } from 'types/admin';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await allAdmins(filters, paginationOptions);

    sendResponse<IAdmin[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await singleAdmin(id);

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin retrieved successfully!',
        data: result,
    });
});

export const updateAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await editAdmin(id, updatedData);

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin updated successfully!',
        data: result,
    });
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await removeAdmin(id);

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin deleted successfully!',
        data: result,
    });
});
