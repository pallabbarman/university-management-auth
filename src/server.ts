import { logger } from 'shared/logger';
import app from './app';
import connectDB from './configs/db.config';
import envConfig from './configs/env.config';

const startServer = async () => {
    await connectDB();
    app.listen(envConfig.port, () => {
        logger.info(`Server running on port ${envConfig.port || 5000}`);
    });
};

startServer();
