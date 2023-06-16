"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentValidation = void 0;
/* eslint-disable import/prefer-default-export */
var student_1 = require("constants/student");
var zod_1 = require("zod");
exports.updateStudentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        }),
        gender: zod_1.z.enum(__spreadArray([], student_1.gender, true)).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum(__spreadArray([], student_1.bloodGroup, true)).optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        academicSemester: zod_1.z.string().optional(),
        academicDepartment: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
        guardian: zod_1.z
            .object({
            fatherName: zod_1.z.string().optional(),
            fatherOccupation: zod_1.z.string().optional(),
            fatherContactNo: zod_1.z.string().optional(),
            motherName: zod_1.z.string().optional(),
            motherOccupation: zod_1.z.string().optional(),
            motherContactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        })
            .optional(),
        localGuardian: zod_1.z
            .object({
            name: zod_1.z.string().optional(),
            occupation: zod_1.z.string().optional(),
            contactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        })
            .optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
