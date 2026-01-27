// cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// 1️⃣ Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2️⃣ Function to upload a file to Cloudinary
const uploadToCloudinary = async (localFilePath) => {
  try {
    // 2.1 Check if file path is provided
    if (!localFilePath) return null;

    // 2.2 Upload the file
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto-detect type (image, video, etc.)
      folder: "ecommerce",    // optional: store all uploads in a folder
      use_filename: true,     // use the original filename
      unique_filename: false, // keep original filename (optional)
    });

    console.log("✅ File uploaded to Cloudinary successfully:", result.secure_url);

    // 2.3 Optional: delete local file after upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // remove file from server to save space
    }

    return result.secure_url; // return the URL of uploaded file
  } catch (error) {
    console.error("❌ Error uploading to Cloudinary:", error);
    throw error; // propagate error to handle in controller
  }
};

// 3️⃣ Export function for use in routes or controllers
export { uploadToCloudinary };
