// backend/routes/student.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 🔸 Add Student
router.post("/add", async (req, res) => {
  try {
    const { name, rollNo, className, tamil, english, maths, science, social, attendance, teacherId } = req.body;

    if (!teacherId || !name || !rollNo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newStudent = new Student({
      name,
      rollNo,
      className,
      tamil,
      english,
      maths,
      science,
      social,
      attendance,
      teacherId,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "Student saved", student: savedStudent });
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔸 Get Students by Teacher
router.get("/:teacherId", async (req, res) => {
  try {
    const students = await Student.find({ teacherId: req.params.teacherId });
    res.json(students);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});
// 🔸 Update student
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Student updated", student: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update" });
  }
});

// Test route
router.get("/ping", (req, res) => res.send("Student route working"));

module.exports = router;
