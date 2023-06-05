import { Server } from 'http';
import { errorLogger, logger } from 'shared/logger';
import app from './app';
import connectDB from './configs/db.config';
import envConfig from './configs/env.config';

const startServer = async () => {
    await connectDB();
    const server: Server = app.listen(envConfig.port, () => {
        logger.info(`Server running on port ${envConfig.port || 5000}`);
    });

    process.on('unhandledRejection', (error) => {
        console.log('Unhandled Rejection is detected, server is closing now!');

        if (server) {
            server.close(() => {
                errorLogger.error(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
};

startServer();
