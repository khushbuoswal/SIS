import mongoose from 'mongoose';

export async function connectMongoDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB is connected.')
        });

        connection.on('error', (error) => {
            console.log('MongoDB connection ERROR. ' + error)
            process.exit();
        });
    } catch (error) {
        console.log("Something went wrong. " + error);
    }
}