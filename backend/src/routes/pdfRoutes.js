const express = require("express");

const router = express.Router();


const {
  uploadPdf,
} = require("../controllers/pdfController");


const protect = require("../middlewares/authMiddleware");

const teacherOnly = require("../middlewares/teacherMiddleware");

const upload = require("../middlewares/uploadMiddleware");



// Upload PDF (Teacher only)
router.post(
  "/upload",
  protect,
  teacherOnly,
  upload.single("file"),
  uploadPdf
);



module.exports = router;