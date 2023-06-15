/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { AcademicFacultyModel, IAcademicFaculty } from 'types/academicFaculty';

const academicFacultySchema = new Schema<IAcademicFaculty>(
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

const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
    'AcademicFaculty',
    academicFacultySchema
);

export default AcademicFaculty;
