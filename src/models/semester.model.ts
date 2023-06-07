/* eslint-disable comma-dangle */
import { Schema, model } from 'mongoose';
import { semesterCodes, semesterMonths, semesterTitles } from 'shared/semester.constant';
import { ISemester, SemesterModel } from 'types/semester';

const semesterSchema = new Schema<ISemester>(
    {
        title: {
            type: String,
            required: true,
            enum: semesterTitles,
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: semesterCodes,
        },
        startMonth: {
            type: String,
            required: true,
            enum: semesterMonths,
        },
        endMonth: {
            type: String,
            required: true,
            enum: semesterMonths,
        },
    },
    {
        timestamps: true,
    }
);

const Semester = model<ISemester, SemesterModel>('Semester', semesterSchema);

export default Semester;
