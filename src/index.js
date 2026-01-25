import express from 'express';
import mongoose from 'mongoose';
import { DB_NAME } from './constant.js';
import dotenv from "dotenv";
import connectDB from './db/index.js';

dotenv.config();

connectDB();

// const app = express();
// dotenv.config();

// (async ()=>{
//     try {
// await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//         console.log('Connected to MongoDB');
//         app.on("error", (err) => {
//             console.log("Error in app:", err);
//             throw err;});
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
        
//         });
//     } catch (error) {
//         console.log('Error:', error);
//         throw error;
//     }
// })();