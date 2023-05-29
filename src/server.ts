import app from './app';
import connectDB from './config/db.config';
import envConfig from './config/env.config';

const startServer = async () => {
    await connectDB();
    app.listen(envConfig.port, () => {
        console.log(`Server running on port ${envConfig.port || 5000}`);
    });
};

startServer();
