const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS configuration — supports localhost and Netlify with credentials
const allowedOrigins = [
  "http://localhost:5173",
  "https://teachz.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// 🔧 Middleware
app.use(express.json());

// 🔹 Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// 🔹 Student routes
const studentRoutes = require("./routes/student");
console.log("✅ student.js file loaded");
app.use("/api/student", studentRoutes);

// 🔹 Not Found handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// 🔌 MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("Connected to DB:", mongoose.connection.name);

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
