import multer from "multer";
import path from "path";

// 1️⃣ Configure storage (disk)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


export const upload = multer({
    storage,
});