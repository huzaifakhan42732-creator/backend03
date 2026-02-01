// src/models/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// 1️⃣ Configure Cloudinary (lazy initialization)
let isConfigured = false;

const configureCloudinary = () => {
  if (!isConfigured) {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary credentials are missing in environment variables");
    }
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    isConfigured = true;
    console.log("✅ Cloudinary configured successfully");
  }
};

// 2️⃣ Function to upload a file to Cloudinary
const uploadToCloudinary = async (localFilePath) => {
  try {
    // Ensure Cloudinary is configured before uploading
    configureCloudinary();
    
    if (!localFilePath) return null; // no file provided

    // Upload file
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto-detect type (image, video, etc.)
      folder: "ecommerce",   // optional: store in a folder
      use_filename: true,    // use original filename
      unique_filename: false,
    });

    // console.log("✅ File uploaded successfully:", result.secure_url);

    // Delete local file safely
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return result.secure_url;
  } catch (error) {
    console.error("❌ Error uploading to Cloudinary:", error.message);
    throw error; // propagate error to controller
  }
};

// 3️⃣ Export function
export { uploadToCloudinary };
