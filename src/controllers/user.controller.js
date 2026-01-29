import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
   
const { username, email, password } = req.body;
console.log("email:", email)


});

export { registerUser };