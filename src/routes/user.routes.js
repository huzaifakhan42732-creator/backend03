import { Router } from "express";
import { LoginUser,registerUser,LogoutUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.midleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(LoginUser);

//secured routes
router.route("/logout").post(verifyJWT, LogoutUser);
export default router;
