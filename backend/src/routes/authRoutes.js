const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const telegramAuth = require("../middlewares/telegramAuth");

const protect = require("../middlewares/authMiddleware");

router.post(
  "/login",
  telegramAuth,
  authController.login
);

router.get(
  "/me",
  protect,
  authController.me
);

router.post(
  "/logout",
  protect,
  authController.logout
);

router.patch(
  "/check-membership",
  protect,
  authController.updateMembership
);

module.exports = router;