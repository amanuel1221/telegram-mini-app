const memberOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }


    if (!req.user.isMember) {
      return res.status(403).json({
        success: false,
        message:
          "Please join the Telegram group to access learning materials",
      });
    }


    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = memberOnly;