import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Server
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server running on port ${process.env.PORT || 5000}`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});
