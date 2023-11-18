"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const academicFaculty_1 = require("../constants/academicFaculty");
const academicFaculty_service_1 = require("../services/academicFaculty.service");
const redis_1 = require("../utils/redis");
const initAcademicFacultyEvents = () => {
    redis_1.RedisClient.subscribe(academicFaculty_1.EVENT_ACADEMIC_FACULTY_CREATED, async (e) => {
        const data = JSON.parse(e);
        await (0, academicFaculty_service_1.createAcademicFacultyFromEvent)(data);
    });
    redis_1.RedisClient.subscribe(academicFaculty_1.EVENT_ACADEMIC_FACULTY_UPDATED, async (e) => {
        const data = JSON.parse(e);
        await (0, academicFaculty_service_1.updateAcademicFacultyFromEvent)(data);
    });
    redis_1.RedisClient.subscribe(academicFaculty_1.EVENT_ACADEMIC_FACULTY_DELETED, async (e) => {
        const data = JSON.parse(e);
        await (0, academicFaculty_service_1.deleteAcademicFacultyFromEvent)(data.id);
    });
};
exports.default = initAcademicFacultyEvents;
