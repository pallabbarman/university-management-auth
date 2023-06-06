/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { ISemester, SemesterModel } from 'types/semester';

const semesterSchema = new Schema<ISemester>(
    {
        title: {
            type: String,
            required: true,
            enum: ['Autumn', 'Summer', 'Fall'],
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: ['01', '02', '03'],
        },
        startMonth: {
            type: String,
            required: true,
        },
        endMonth: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Semester = model<ISemester, SemesterModel>('Semester', semesterSchema);

export default Semester;
