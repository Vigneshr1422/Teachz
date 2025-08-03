// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allowed origins for both localhost and Netlify
const allowedOrigins = [
  "http://localhost:5173",
  "https://teachz.netlify.app",
];

// ✅ CORS with explicit origin callback + logging
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🔍 Incoming request origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Extra header to ensure credentials are included
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Body parser 
app.use(express.json());

// ✅ Route setup
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const studentRoutes = require("./routes/student");
console.log("✅ student.js file loaded");
app.use("/api/student", studentRoutes);

// ✅ Fallback handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// ✅ Connect to MongoDB and launch server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
