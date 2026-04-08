import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 4000;

        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on("error", (error) => {
            console.error("Server error: ", error);
            process.exit(1);
        });

    } catch (error) {
        console.error("Error starting the server: ", error);
        process.exit(1);
    }
};

startServer();