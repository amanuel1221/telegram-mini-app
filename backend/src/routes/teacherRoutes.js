const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const teacherOnly = require("../middlewares/teacherMiddleware");
const memberOnly = require("../middlewares/memberMiddleware")
const {
  getDashboardStats,
} = require("../controllers/teacherController");

router.get(
  "/dashboard",
  protect,
  memberOnly,
  teacherOnly,
  getDashboardStats
);

module.exports = router;