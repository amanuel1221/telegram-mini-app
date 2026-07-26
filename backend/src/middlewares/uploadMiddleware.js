const multer = require("multer");

// Store file in memory (RAM)
const storage = multer.memoryStorage();

// Allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Configure multer
const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },

  fileFilter,
});

module.exports = upload;