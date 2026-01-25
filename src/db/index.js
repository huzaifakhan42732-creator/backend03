import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDB = async () => {
    try {
        
       const connectionInstance= await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
       console.log(`\nMongoDB connected: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }};

    export default connectDB;