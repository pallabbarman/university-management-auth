/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import Admin from 'models/admin.model';
import Faculty from 'models/faculty.model';
import Semester from 'models/semester.model';
import Student from 'models/student.model';
import User from 'models/user.model';
import { startSession } from 'mongoose';
import { IAdmin } from 'types/admin';
import { IFaculty } from 'types/faculty';
import { IStudent } from 'types/students';
import { IUser, USER_ROLE } from 'types/user';
import { generateAdminId, generateFacultyId, generateStudentId } from 'utils/user';

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

export const createNewFaculty = async (faculty: IFaculty, user: IUser): Promise<IUser | null> => {
    // default password
    if (!user.password) {
        user.password = envConfig.default_faculty_pass as string;
    }
    // set role
    user.role = USER_ROLE.FACULTY;

    // generate faculty id
    let newUserAllData = null;
    const session = await startSession();
    try {
        session.startTransaction();

        const id = await generateFacultyId();
        user.id = id;
        faculty.id = id;

        const newFaculty = await Faculty.create([faculty], { session });

        if (!newFaculty.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty!');
        }

        user.faculty = newFaculty[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty!');
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
            path: 'faculty',
            populate: [
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

export const createNewAdmin = async (admin: IAdmin, user: IUser): Promise<IUser | null> => {
    // default password
    if (!user.password) {
        user.password = envConfig.default_admin_pass as string;
    }

    // set role
    user.role = 'admin';
    let newUserAllData = null;
    const session = await startSession();
    try {
        session.startTransaction();

        const id = await generateAdminId();
        user.id = id;
        admin.id = id;

        const newAdmin = await Admin.create([admin], { session });

        if (!newAdmin.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin!');
        }

        user.admin = newAdmin[0]._id;
        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
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
            path: 'admin',
            populate: [
                {
                    path: 'managementDepartment',
                },
            ],
        });
    }

    return newUserAllData;
};
