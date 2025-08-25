import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env");
}

const connectDB = async () => {
    try {
        const conn = await connect(MONGO_URI); 
        console.log('MongoDB connected');
        return conn;        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;