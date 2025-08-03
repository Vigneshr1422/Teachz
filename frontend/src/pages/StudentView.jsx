import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function StudentView() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  useEffect(() => {
    if (!teacher) return;
    axios.get(`/student/${teacher._id}`).then((res) => {
      setStudents(res.data);
    });
  }, [teacher]);

  // ✅ Step 1: Add total, average, and result
  const processedStudents = students.map((stu) => {
    const subjects = ["tamil", "english", "maths", "science", "social"];
    const marks = subjects.map((sub) => parseInt(stu[sub]) || 0);
    const total = marks.reduce((a, b) => a + b, 0);
    const avg = total / subjects.length;

    let result = "Fail";
    if (stu.attendance === "Not Attend") {
      result = "Absent";
    } else if (marks.every((m) => m >= 35)) {
      result = "Pass";
    }

    return { ...stu, total, avg, result };
  });

  // ✅ Step 2: Sort only Pass students by total and assign rank
 // Get only pass students sorted by total desc
const passStudents = processedStudents
  .filter((stu) => stu.result === "Pass")
  .sort((a, b) => b.total - a.total);

// Dense ranking logic
let currentRank = 1;
let lastScore = null;

passStudents.forEach((stu, idx) => {
  if (stu.total !== lastScore) {
    stu.rank = currentRank;
    lastScore = stu.total;
  } else {
    stu.rank = currentRank;
  }
  currentRank++;
});


  // ✅ Step 3: Merge back rank for all students
  const rankedStudents = processedStudents.map((stu) => {
    if (stu.result === "Pass") {
      const matched = passStudents.find((p) => p._id === stu._id);
      return { ...stu, rank: matched.rank };
    }
    return { ...stu, rank: "-" };
  });

  // ✅ Step 4: Filter logic
  const filteredStudents = rankedStudents.filter((stu) => {
    if (filter === "Pass") return stu.result === "Pass";
    if (filter === "Fail") return stu.result === "Fail";
    if (filter === "Absent") return stu.result === "Absent";
    if (filter === "Rank") return stu.result === "Pass";
    return true;
  });

  // ✅ Step 5: Sort by rank if Rank filter selected
  const finalList =
    filter === "Rank"
? [...filteredStudents].sort((a, b) => (a.rank === "-" ? Infinity : a.rank) - (b.rank === "-" ? Infinity : b.rank))
      : filteredStudents;

  // ✅ Step 6: Pagination
  const totalPages = Math.ceil(finalList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = finalList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        📊 Student Result View
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {["All", "Pass", "Fail", "Absent", "Rank"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setFilter(type);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-semibold shadow ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-300">
        <table className="w-full text-base text-center border-collapse">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr className="text-blue-800 font-bold text-base">
              <th className="px-4 py-3 border">S.No</th>
              <th className="px-4 py-3 border">Name 🔼</th>
              <th className="px-4 py-3 border">Roll No</th>
              <th className="px-4 py-3 border">Class</th>
              <th className="px-4 py-3 border">Total</th>
              <th className="px-4 py-3 border">Average</th>
              <th className="px-4 py-3 border">Result</th>
              <th className="px-4 py-3 border">Rank</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((stu, index) => (
              <tr
                key={stu._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3 border">{startIndex + index + 1}</td>
                <td className="px-4 py-3 border font-medium">{stu.name}</td>
                <td className="px-4 py-3 border">{stu.rollNo}</td>
                <td className="px-4 py-3 border">{stu.className}</td>
                <td className="px-4 py-3 border">{stu.total}</td>
                <td className="px-4 py-3 border">{stu.avg.toFixed(2)}</td>
                <td className="px-4 py-3 border">
                  <span
                    className={`px-2 py-1 text-xs rounded font-semibold ${
                      stu.result === "Pass"
                        ? "bg-green-100 text-green-700"
                        : stu.result === "Fail"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {stu.result}
                  </span>
                </td>
                <td className="px-4 py-3 border font-bold text-blue-700">
                  {stu.rank}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ◀️ Previous
        </button>
        <span className="font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next ▶️
        </button>
      </div>

      {/* Back Button */}
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
