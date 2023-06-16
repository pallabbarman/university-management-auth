/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import Semester from 'models/semester.model';
import Student from 'models/student.model';
import User from 'models/user.model';
import { startSession } from 'mongoose';
import { IStudent } from 'types/students';
import { IUser, USER_ROLE } from 'types/user';
import { generateStudentId } from 'utils/user';

// eslint-disable-next-line import/prefer-default-export
export const createNewStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
    if (!user.password) {
        user.password = envConfig.default_student_pass as string;
    }

    // set role
    user.role = USER_ROLE.STUDENT;

    const semester = await Semester.findById(student.semester);

    // generate student id
    let newUserAllData = null;
    const session = await startSession();
    try {
        session.startTransaction();
        const id = await generateStudentId(semester);
        user.id = id;
        student.id = id;

        const newStudent = await Student.create([student], { session });

        if (!newStudent.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }

        user.student = newStudent[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserAllData) {
        newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'semester',
                },
                {
                    path: 'department',
                },
                {
                    path: 'academicFaculty',
                },
            ],
        });
    }

    return newUserAllData;
};
