const express = require("express");

const router = express.Router();


const {
  uploadPdf,getAllPdfs,getPdfById,streamPdf,getMyPdfs,updatePdf,deletePdf,
} = require("../controllers/pdfController");


const protect = require("../middlewares/authMiddleware");

const teacherOnly = require("../middlewares/teacherMiddleware");
const memberOnly = require("../middlewares/memberMiddleware");

const upload = require("../middlewares/uploadMiddleware");



router.post(
  "/upload",
  protect,
  memberOnly,
  teacherOnly,
  upload.single("file"),
  uploadPdf
);
router.get(
    "/",
    protect,
    memberOnly,
    getAllPdfs
);
router.get(
  "/my-files",
  protect,
  memberOnly,
  teacherOnly,
  getMyPdfs
);

router.put("/:id", protect, teacherOnly, updatePdf);
router.delete(
  "/:id",
  protect,
  memberOnly,
  teacherOnly,
  deletePdf
);


router.get(
    "/:id",
    protect,
    memberOnly,
    getPdfById
);
router.get(
  "/:id/view",
  protect,
  memberOnly,
  streamPdf
);



module.exports = router;