const User = require("../models/User");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "telegramId username firstName lastName role isMember createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
    })
      .select(
        "telegramId username firstName lastName role isMember createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      users: students,
    });
  } catch (error) {
    console.error("Get Students Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.promoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "teacher") {
      return res.status(400).json({
        success: false,
        message: "User is already a teacher",
      });
    }

    user.role = "teacher";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User promoted successfully",
      user,
    });
  } catch (error) {
    console.error("Promote User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const [totalStudents, totalTeachers] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "teacher" }),
    ]);

    return res.status(200).json({
      success: true,
      totalStudents,
      totalTeachers,
    });
  } catch (error) {
    console.error("Get User Stats Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};