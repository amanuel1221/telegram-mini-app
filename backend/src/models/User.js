const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    telegramId: {
      type: Number,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      default: "",
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      default: "",
    },

    photoUrl: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },

    isMember: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);