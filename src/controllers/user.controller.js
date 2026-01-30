import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../models/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // 1️⃣ Get data
  const { username, email, password, fullname } = req.body;

  // 2️⃣ Validate
  if (!username || !email || !password || !fullname) {
    throw new ApiError(400, "All fields are required");
  }

  // 3️⃣ Check existing user
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // 4️⃣ Files from multer
  const avatarPath = req.files?.avatar?.[0]?.path;
  const coverImagePath = req.files?.coverImage?.[0]?.path;

  if (!avatarPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  // 5️⃣ Upload images
  const avatarUrl = await uploadToCloudinary(avatarPath);
  const coverImageUrl = coverImagePath
    ? await uploadToCloudinary(coverImagePath)
    : "";

  if (!avatarUrl) {
    throw new ApiError(500, "Avatar upload failed");
  }

  // 6️⃣ Create user
  const user = await User.create({
    username,
    email,
    password,
    fullname,
    avatar: avatarUrl,
    coverImage: coverImageUrl
  });

  // 7️⃣ Remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  // 8️⃣ Send response
  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});

export { registerUser };
