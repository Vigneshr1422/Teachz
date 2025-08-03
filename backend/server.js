const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔐 CORS setup — allow frontend access
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://teachz.netlify.app", // deployed frontend (example)
    ],
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
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
