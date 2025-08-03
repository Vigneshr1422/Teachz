const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Teacher = require("../models/Teacher");

// Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ name, email, password: hashed });
    await teacher.save();

    res.status(201).json({ msg: "Registered successfully", teacher });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(404).json({ msg: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    res.status(200).json({ msg: "Login successful", teacher });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
