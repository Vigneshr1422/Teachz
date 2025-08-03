import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import axios from "../api/axios";

export default function SubjectWise() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate hook
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  useEffect(() => {
    if (!teacher) return;
    axios
      .get(`/student/${teacher._id}`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [teacher]);

  const subjects = ["tamil", "english", "maths", "science", "social"];

  const subjectStats = subjects.map((sub) => {
    let totalMarks = 0;
    let count = 0;
    let passed = 0;

    students.forEach((stu) => {
      if (stu.attendance === "Attend") {
        const mk = parseInt(stu[sub]);
        if (!isNaN(mk)) {
          totalMarks += mk;
          count++;
          if (mk >= 35) passed++;
        }
      }
    });

    return {
      subject: sub.charAt(0).toUpperCase() + sub.slice(1),
      avg: count > 0 ? (totalMarks / count).toFixed(2) : "-",
      attended: count,
      passed,
      failed: count - passed,
    };
  });

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6 underline-offset-4">
        📚 Subject-Wise Performance Report
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="w-full text-center">
            <thead className="bg-blue-200 text-blue-800 text-sm sm:text-base font-semibold">
              <tr>
                <th className="px-3 py-3 sm:px-5 sm:py-4">📘 Subject</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">📊 Avg Mark</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">👨‍🎓 Attended</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">✅ Passed</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">❌ Failed</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base text-gray-700">
              {subjectStats.map((stat, index) => (
                <tr
                  key={stat.subject}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-3 py-3 sm:px-5 sm:py-3 font-medium text-blue-900">
                    {stat.subject}
                  </td>
                  <td className="px-3 py-3 sm:px-5 sm:py-3">{stat.avg}</td>
                  <td className="px-3 py-3 sm:px-5 sm:py-3">{stat.attended}</td>
                  <td className="px-3 py-3 sm:px-5 sm:py-3">
                    <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {stat.passed}
                    </span>
                  </td>
                  <td className="px-3 py-3 sm:px-5 sm:py-3">
                    <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {stat.failed}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔙 Back Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md text-sm sm:text-base transition"
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}
