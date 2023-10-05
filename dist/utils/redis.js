"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
/* eslint-disable no-return-await */
const env_config_1 = __importDefault(require("../configs/env.config"));
const redis_1 = require("redis");
const logger_1 = require("./logger");
const redisClient = (0, redis_1.createClient)({
    url: env_config_1.default.redis.url,
});
const redisPubClient = (0, redis_1.createClient)({
    url: env_config_1.default.redis.url,
});
const redisSubClient = (0, redis_1.createClient)({
    url: env_config_1.default.redis.url,
});
redisClient.on('error', (err) => logger_1.logger.error('RedisError', err));
redisClient.on('connect', () => logger_1.logger.info('Redis Connected'));
const redisConnect = async () => {
    await redisClient.connect();
    await redisPubClient.connect();
    await redisSubClient.connect();
};
const set = async (key, value, options) => {
    await redisClient.set(key, value, options);
};
const get = async (key) => await redisClient.get(key);
const del = async (key) => {
    await redisClient.del(key);
};
const setAccessToken = async (userId, token) => {
    const key = `access-token:${userId}`;
    await redisClient.set(key, token, { EX: Number(env_config_1.default.redis.expires_in) });
};
const getAccessToken = async (userId) => {
    const key = `access-token:${userId}`;
    return await redisClient.get(key);
};
const delAccessToken = async (userId) => {
    const key = `access-token:${userId}`;
    await redisClient.del(key);
};
const disconnect = async () => {
    await redisClient.quit();
    await redisPubClient.quit();
    await redisSubClient.quit();
};
exports.RedisClient = {
    set,
    get,
    del,
    setAccessToken,
    getAccessToken,
    delAccessToken,
    disconnect,
    publish: redisPubClient.publish.bind(redisPubClient),
    subscribe: redisSubClient.subscribe.bind(redisSubClient),
};
exports.default = redisConnect;
