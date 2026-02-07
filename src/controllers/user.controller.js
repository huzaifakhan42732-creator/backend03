import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../models/cloudinary.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
try{
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
}
catch(error){
throw new ApiError(500, "Something went wrong while generating tokens")
}}

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

const LoginUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body;
  // 1️⃣ Validate
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  // 2️⃣ Find user
 const user = await User.findOne({
$or: [{ email }, { username: email }]
  })

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // 3️⃣ Generate tokens
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true
  };

  return res.status(200).cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  );

  const options = {
    httpOnly: true,
    secure: true
  };

  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
});
export { registerUser, LoginUser, logoutUser };