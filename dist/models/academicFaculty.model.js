"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    syncId: {
        type: String,
        required: false,
        unique: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', academicFacultySchema);
exports.default = AcademicFaculty;
