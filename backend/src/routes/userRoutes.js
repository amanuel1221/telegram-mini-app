const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getStudents,
  promoteUser,
  getUserStats,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");
const teacherOnly = require("../middlewares/teacherMiddleware");


router.get(
  "/",
  protect,
  teacherOnly,
  getAllUsers
);


router.get(
  "/students",
  protect,
  teacherOnly,
  getStudents
);
router.get("/stats", protect, teacherOnly, getUserStats);

router.patch(
  "/:id/promote",
  protect,
  teacherOnly,
  promoteUser
);

module.exports = router;