// backend/models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  className: { type: String },
  tamil: { type: String },
  english: { type: String },
  maths: { type: String },
  science: { type: String },
  social: { type: String },
  attendance: {
    type: String,
    enum: ["Attend", "Not Attend"],
    default: "Attend",
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
