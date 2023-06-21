"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const mongoose_1 = require("mongoose");
const facultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: false,
            },
        },
        required: true,
        _id: false,
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    academicFaculty: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Faculty = (0, mongoose_1.model)('Faculty', facultySchema);
exports.default = Faculty;
