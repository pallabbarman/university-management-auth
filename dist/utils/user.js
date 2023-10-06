"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = exports.findLastAdminId = exports.findLastFacultyId = exports.findLastStudentId = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const user_1 = require("../types/user");
const findLastStudentId = async () => {
    const lastStudent = await user_model_1.default.findOne({ role: user_1.USER_ROLE.STUDENT }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
exports.findLastStudentId = findLastStudentId;
const findLastFacultyId = async () => {
    const lastFaculty = await user_model_1.default.findOne({ role: user_1.USER_ROLE.FACULTY }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};
exports.findLastFacultyId = findLastFacultyId;
const findLastAdminId = async () => {
    const lastFaculty = await user_model_1.default.findOne({ role: user_1.USER_ROLE.ADMIN }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};
exports.findLastAdminId = findLastAdminId;
const generateStudentId = async (semester) => {
    const currentId = (await (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');
    incrementedId = `${semester?.year.toString().substring(2)}${semester?.code}${incrementedId}`;
    return incrementedId;
};
exports.generateStudentId = generateStudentId;
const generateFacultyId = async () => {
    const currentId = (await (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
};
exports.generateFacultyId = generateFacultyId;
const generateAdminId = async () => {
    const currentId = (await (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
};
exports.generateAdminId = generateAdminId;
