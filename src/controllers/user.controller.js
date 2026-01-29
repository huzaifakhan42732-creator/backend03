/* This code snippet is defining a function called `registerUser` that handles the registration process
for a new user. Here's a breakdown of what the code is doing: */
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadToCloudinary} from "../models/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res, next) => {
   //get user details from frontend
   //validation
   //check if user already exists
   //check for image upload and avatar creation
   //upload avatar to cloudinary
   //cretate user in db-user object
   //remove password and refresh token from response
   //check for user creation success
   //return response
const { username, email, password } = req.body;
console.log("email:", email)
/* This portion of the code snippet is performing validation checks before creating a new user in the
database. Here's a breakdown of what each step is doing: */

if (!username || !email || !password) {
    return next(new ApiError(400, "All fields are required"));
}

const existingUser = await User.findOne({
    $or: [{ email }, { username }]
});
if (existingUser) {
    return next(new ApiError(409, "User with this email already exists"));
}

/* This portion of the code snippet is checking if the avatar image path and cover image path exist in
the `req.files` object. */
const avatarPath = req.files?.avatar[0]?.path;
const coverImagePath = req.files?.coverImage?.[0]?.path;

if(!avatarPath) {
    throw new ApiError(400, "Avatar image is required");
}

/* This portion of the code snippet is handling the uploading of the avatar image and cover image to
Cloudinary. Here's a breakdown of what each step is doing: */
const avatarUrl = await uploadToCloudinary(avatarPath);
const coverImageUrl = await uploadToCloudinary(coverImagePath);
if (!avatarUrl) {
    throw new ApiError(500, "Failed to upload avatar image");
}
/* This portion of the code snippet is responsible for creating a new user in the database after
validating the user details and uploading the avatar image to Cloudinary. Here's a breakdown of what
each step is doing: */

const newUser = await User.create({
    username,
    email,
    password,
    avatar: avatarUrl,
    coverImage: coverImageUrl?.url || ""
});

const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
);
});
export { registerUser };