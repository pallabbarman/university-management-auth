"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semester_1 = require("../constants/semester");
const semester_service_1 = require("../services/semester.service");
const redis_1 = require("../utils/redis");
const initSemesterEvents = () => {
    redis_1.RedisClient.subscribe(semester_1.EVENT_SEMESTER_CREATED, async (event) => {
        const data = JSON.parse(event);
        await (0, semester_service_1.createSemesterFromEvent)(data);
    });
    redis_1.RedisClient.subscribe(semester_1.EVENT_SEMESTER_UPDATED, async (event) => {
        const data = JSON.parse(event);
        await (0, semester_service_1.updateSemesterFromEvent)(data);
    });
    redis_1.RedisClient.subscribe(semester_1.EVENT_SEMESTER_DELETED, async (event) => {
        const data = JSON.parse(event);
        await (0, semester_service_1.deleteSemesterFromEvent)(data.id);
    });
};
exports.default = initSemesterEvents;
