const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// 🔹 Student routes — YOU MISSED THIS PART
const studentRoutes = require("./routes/student");
console.log("✅ student.js file loaded"); // Add this line
app.use("/api/student", studentRoutes);


// 🔹 Not Found handler

// 🔹 MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected ✅");
    console.log("Connected to DB:", mongoose.connection.name); // 👈 Add this line
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
