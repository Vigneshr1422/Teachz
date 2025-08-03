// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allowed frontend origins (localhost + Netlify domains)
const allowedOrigins = [
  "http://localhost:5173",
  "https://teachz.netlify.app",
  "https://main--teachz.netlify.app", // ← Netlify preview deploy URL
];

// ✅ CORS middleware with dynamic origin check
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🔍 Incoming request origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Allow credentials in response headers too
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Express body parser
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const studentRoutes = require("./routes/student");
console.log("✅ student.js file loaded");
app.use("/api/student", studentRoutes);

// ✅ Fallback route
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// ✅ Connect MongoDB and start server
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
