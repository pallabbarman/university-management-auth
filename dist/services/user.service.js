"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewStudent = void 0;
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const env_config_1 = __importDefault(require("../configs/env.config"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const semester_model_1 = __importDefault(require("../models/semester.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = require("mongoose");
const user_1 = require("../types/user");
const user_2 = require("../utils/user");
// eslint-disable-next-line import/prefer-default-export
const createNewStudent = async (student, user) => {
    if (!user.password) {
        user.password = env_config_1.default.default_student_pass;
    }
    // set role
    user.role = user_1.USER_ROLE.STUDENT;
    const semester = await semester_model_1.default.findById(student.semester);
    // generate student id
    let newUserAllData = null;
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const id = await (0, user_2.generateStudentId)(semester);
        user.id = id;
        student.id = id;
        const newStudent = await student_model_1.default.create([student], { session });
        if (!newStudent.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        user.student = newStudent[0]._id;
        const newUser = await user_model_1.default.create([user], { session });
        if (!newUser.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        await session.commitTransaction();
        await session.endSession();
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = await user_model_1.default.findOne({ id: newUserAllData.id }).populate({
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
exports.createNewStudent = createNewStudent;
