import { connect } from 'mongoose';
import { errorLogger, logger } from 'utils/logger';
import envConfig from './env.config';

const connectDB = async () => {
    try {
        await connect(envConfig.db_url as string);
        logger.info('Database connected successfully!');
    } catch (error: unknown) {
        errorLogger.error(`Failed to connect database ${error}`);
    }
};

export default connectDB;
