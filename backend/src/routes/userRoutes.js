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
const memberOnly= require("../middlewares/memberMiddleware")


router.get(
  "/",
  protect,
  memberOnly,
  teacherOnly,
  getAllUsers
);


router.get(
  "/students",
  protect,
  memberOnly,
  teacherOnly,
  getStudents
);
router.get("/stats", protect,memberOnly,teacherOnly, getUserStats);

router.patch(
  "/:id/promote",
  protect,
  memberOnly,
  teacherOnly,
  promoteUser
);

module.exports = router;