const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function(origin, callback) {

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }

    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Telegram LMS API Running 🚀",
  });
});
app.use("/auth", authRoutes);
app.use(
  "/pdfs",
  pdfRoutes
);
app.use("/users", userRoutes);
app.use("/teacher", teacherRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;