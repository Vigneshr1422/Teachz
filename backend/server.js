// ✅ STEP 1: Import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ STEP 2: Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://teachz.netlify.app",
];

// ✅ STEP 3: CORS middleware with credentials support
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // ✅ Return specific origin, not `true`
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Enable cookies/sessions across domains
  })
);

// ✅ STEP 4: Optional - Set manual CORS headers (extra safety)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ STEP 5: Parse JSON request bodies
app.use(express.json());

// ✅ STEP 6: Load routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const studentRoutes = require("./routes/student");
console.log("✅ student.js file loaded");
app.use("/api/student", studentRoutes);

// ✅ STEP 7: Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// ✅ STEP 8: Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("Connected to DB:", mongoose.connection.name);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
