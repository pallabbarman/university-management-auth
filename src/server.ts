import { Server } from 'http';
import { errorLogger, logger } from 'utils/logger';
import app from './app';
import connectDB from './configs/db.config';
import envConfig from './configs/env.config';

process.on('uncaughtException', (error) => {
    errorLogger.error(error);
    process.exit(1);
});

let server: Server;

const startServer = async () => {
    await connectDB();
    server = app.listen(envConfig.port, () => {
        logger.info(`Server running on port ${envConfig.port || 5001}`);
    });

    process.on('unhandledRejection', (error) => {
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
