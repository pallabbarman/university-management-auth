"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
var mongoose_1 = require("mongoose");
var academicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
var AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', academicFacultySchema);
exports.default = AcademicFaculty;
