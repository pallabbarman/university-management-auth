"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const department_1 = require("../constants/department");
const department_service_1 = require("../services/department.service");
const redis_1 = require("../utils/redis");
const initDepartmentEvents = () => {
    redis_1.RedisClient.subscribe(department_1.EVENT_DEPARTMENT_CREATED, async (e) => {
        const data = JSON.parse(e);
        await (0, department_service_1.createDepartmentFromEvent)(data);
    });
    redis_1.RedisClient.subscribe(department_1.EVENT_DEPARTMENT_UPDATED, async (e) => {
        const data = JSON.parse(e);
        await (0, department_service_1.updateDepartmentFromEvent)(data);
    });
    redis_1.RedisClient.subscribe(department_1.EVENT_DEPARTMENT_DELETED, async (e) => {
        const data = JSON.parse(e);
        await (0, department_service_1.deleteDepartmentFromEvent)(data.id);
    });
};
exports.default = initDepartmentEvents;
