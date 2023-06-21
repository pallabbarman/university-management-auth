"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const mongoose_1 = require("mongoose");
const managementDepartmentSchema = new mongoose_1.Schema({
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
const ManagementDepartment = (0, mongoose_1.model)('ManagementDepartment', managementDepartmentSchema);
exports.default = ManagementDepartment;
