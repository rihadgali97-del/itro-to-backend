import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log('mongoDB connection failed ', error);
    }
};

export default connectDB;