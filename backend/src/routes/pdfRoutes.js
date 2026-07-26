const express = require("express");

const router = express.Router();


const {
  uploadPdf,getAllPdfs,getPdfById,
} = require("../controllers/pdfController");


const protect = require("../middlewares/authMiddleware");

const teacherOnly = require("../middlewares/teacherMiddleware");

const upload = require("../middlewares/uploadMiddleware");



router.post(
  "/upload",
  protect,
  teacherOnly,
  upload.single("file"),
  uploadPdf
);
router.get(
    "/",
    protect,
    getAllPdfs
);
router.get(
    "/:id",
    protect,
    getPdfById
);



module.exports = router;