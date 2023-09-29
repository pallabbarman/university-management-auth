/* eslint-disable no-return-await */
import envConfig from 'configs/env.config';
import { SetOptions, createClient } from 'redis';
import { logger } from './logger';

const redisClient = createClient({
    url: envConfig.redis.url,
});

const redisPubClient = createClient({
    url: envConfig.redis.url,
});

const redisSubClient = createClient({
    url: envConfig.redis.url,
});

redisClient.on('error', (err) => logger.error('RedisError', err));
redisClient.on('connect', () => logger.info('Redis Connected'));

const redisConnect = async (): Promise<void> => {
    await redisClient.connect();
    await redisPubClient.connect();
    await redisSubClient.connect();
};

const set = async (key: string, value: string, options?: SetOptions): Promise<void> => {
    await redisClient.set(key, value, options);
};

const get = async (key: string): Promise<string | null> => await redisClient.get(key);

const del = async (key: string): Promise<void> => {
    await redisClient.del(key);
};

const setAccessToken = async (userId: string, token: string): Promise<void> => {
    const key = `access-token:${userId}`;
    await redisClient.set(key, token, { EX: Number(envConfig.redis.expires_in) });
};

const getAccessToken = async (userId: string): Promise<string | null> => {
    const key = `access-token:${userId}`;
    return await redisClient.get(key);
};

const delAccessToken = async (userId: string): Promise<void> => {
    const key = `access-token:${userId}`;
    await redisClient.del(key);
};

const disconnect = async (): Promise<void> => {
    await redisClient.quit();
    await redisPubClient.quit();
    await redisSubClient.quit();
};

export const RedisClient = {
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

export default redisConnect;
