import { useState } from "react";
import axios from "../api/axios";

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    className: "",
    tamil: "",
    english: "",
    maths: "",
    science: "",
    social: "",
    attendance: "Attend", // default value
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    if (!teacher) return alert("Please login");

    try {
      await axios.post("/student/add", {
        ...form,
        teacherId: teacher._id,
      });
      alert("Student added!");
      setForm({
        name: "",
        rollNo: "",
        className: "",
        tamil: "",
        english: "",
        maths: "",
        science: "",
        social: "",
        attendance: "Attend",
      });
    } catch (err) {
      console.error(err);
      alert("Error while saving student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <h2 className="col-span-full text-2xl font-bold text-blue-600 text-center mb-4">
          Add Student
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Student Name"
          className="p-2 border rounded"
        />
        <input
          name="rollNo"
          value={form.rollNo}
          onChange={handleChange}
          required
          placeholder="Roll Number"
          className="p-2 border rounded"
        />
        <input
          name="className"
          value={form.className}
          onChange={handleChange}
          placeholder="Class (e.g., 10A)"
          className="p-2 border rounded"
        />

        <input
          name="tamil"
          value={form.tamil}
          onChange={handleChange}
          placeholder="Tamil Marks"
          className="p-2 border rounded"
        />
        <input
          name="english"
          value={form.english}
          onChange={handleChange}
          placeholder="English Marks"
          className="p-2 border rounded"
        />
        <input
          name="maths"
          value={form.maths}
          onChange={handleChange}
          placeholder="Maths Marks"
          className="p-2 border rounded"
        />
        <input
          name="science"
          value={form.science}
          onChange={handleChange}
          placeholder="Science Marks"
          className="p-2 border rounded"
        />
        <input
          name="social"
          value={form.social}
          onChange={handleChange}
          placeholder="Social Marks"
          className="p-2 border rounded"
        />

        <select
          name="attendance"
          value={form.attendance}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Attend">Attend</option>
          <option value="Not Attend">Not Attend</option>
        </select>

                <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="col-span-full mt-2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
        >
          ← Back
        </button>

      </form>
    </div>
  );
}
