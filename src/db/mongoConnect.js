import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL || !DB_NAME) {
      throw new Error("MongoDB URL or DB_NAME is missing!");
    }

    const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
      dbName: DB_NAME, // specify DB name here
    });

    console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}/${DB_NAME}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
