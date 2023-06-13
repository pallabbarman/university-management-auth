/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from 'types/faculty';

const facultySchema = new Schema<IFaculty>(
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

const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);

export default Faculty;
