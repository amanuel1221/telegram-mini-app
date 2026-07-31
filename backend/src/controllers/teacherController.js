const User = require("../models/User");
const Pdf = require("../models/Pdf");

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalMembers,
      totalPdfs,
      myPdfs,
      recentPdfs,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "teacher" }),
      User.countDocuments({ isMember: true }),
      Pdf.countDocuments(),
      Pdf.countDocuments({
        uploadedBy: req.user._id,
      }),
      Pdf.find()
        .populate(
          "uploadedBy",
          "firstName lastName username"
        )
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        totalStudents,
        totalTeachers,
        totalMembers,
        totalPdfs,
        myPdfs,
      },

      recentPdfs,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};