import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import connectDB from "./db/mongoConnect.js";
import { app } from "./app.js";
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);
console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
