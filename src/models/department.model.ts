/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { DepartmentModel, IDepartment } from 'types/department';

const departmentSchema = new Schema<IDepartment, DepartmentModel>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

const Department = model<IDepartment, DepartmentModel>('Department', departmentSchema);

export default Department;
