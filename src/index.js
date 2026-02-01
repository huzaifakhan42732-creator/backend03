import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import connectDB from "./db/mongoConnect.js";
import { app } from "./app.js";
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
