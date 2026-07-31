const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const teacherOnly = require("../middlewares/teacherMiddleware");

const {
  getDashboardStats,
} = require("../controllers/teacherController");

router.get(
  "/dashboard",
  protect,
  teacherOnly,
  getDashboardStats
);

module.exports = router;