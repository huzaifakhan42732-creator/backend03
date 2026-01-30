// import multer from "multer";
// import path from "path";

// // 1️⃣ Configure storage (disk)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public"); // folder where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });


// export const upload = multer({
//     storage,
// });
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = "uploads";

// Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

export const upload = multer({ storage });
