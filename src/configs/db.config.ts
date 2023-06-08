import { connect, set } from 'mongoose';
import { errorLogger, logger } from 'shared/logger';
import envConfig from './env.config';

const connectDB = async () => {
    try {
        set('strictQuery', true);
        await connect(envConfig.db_url as string);
        logger.info('Database connected successfully!');
    } catch (error: unknown) {
        errorLogger.error(`Error: ${error}`);
    }
};

export default connectDB;
