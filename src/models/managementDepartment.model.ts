/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { IManagementDepartment, ManagementDepartmentModel } from 'types/managementDepartment';

const managementDepartmentSchema = new Schema<IManagementDepartment, ManagementDepartmentModel>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

const ManagementDepartment = model<IManagementDepartment, ManagementDepartmentModel>(
    'ManagementDepartment',
    managementDepartmentSchema
);

export default ManagementDepartment;
