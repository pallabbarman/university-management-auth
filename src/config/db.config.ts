import mongoose from 'mongoose';
import envConfig from './env.config';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(envConfig.db_url as string);
        console.log('Database connected successfully!');
    } catch (error: unknown) {
        console.error(`Error: ${error}`);
    }
};

export default connectDB;
