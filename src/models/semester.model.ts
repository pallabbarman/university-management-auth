/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
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

// handling same year and same semester issue
semesterSchema.pre('save', async function (next) {
    const isExist = await Semester.findOne({ title: this.title, year: this.year });

    if (isExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Semester is already exist!');
    }

    next();
});

const Semester = model<ISemester, SemesterModel>('Semester', semesterSchema);

export default Semester;
