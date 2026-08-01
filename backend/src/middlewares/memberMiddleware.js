const { checkMembership } = require("../services/telegramService");

const memberOnly = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const isMember = await checkMembership(req.user.telegramId);

    if (req.user.isMember !== isMember) {
      req.user.isMember = isMember;
      await req.user.save();
    }

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message:
          "Please join the Telegram group to access learning materials",
      });
    }

    next();

  } catch (error) {
    console.error("Member verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify Telegram group membership",
    });
  }
};

module.exports = memberOnly;