import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    if (!teacher) return alert("Please login");

    const fetchStudents = async () => {
      try {
        const res = await axios.get(`/student/${teacher._id}`);
        setStudents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students", err);
        alert("Failed to load students");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditStudent(student);
    setForm(student);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/student/update/${editStudent._id}`, form);
      alert("Student updated!");
      setEditStudent(null);

      const teacher = JSON.parse(localStorage.getItem("teacher"));
      const res = await axios.get(`/student/${teacher._id}`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/student/delete/${editStudent._id}`);
      alert("Student deleted successfully!");
      setEditStudent(null);

      const teacher = JSON.parse(localStorage.getItem("teacher"));
      const res = await axios.get(`/student/${teacher._id}`);
      setStudents(res.data);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete student.");
    }
  };

  const handleCSVDownload = () => {
    const headers = [
      "S.No,Name,Roll No,Class,Tamil,English,Maths,Science,Social,Attendance",
    ];

    const rows = students
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((stu, i) =>
        [
          i + 1,
          stu.name,
          stu.rollNo,
          stu.className,
          stu.tamil,
          stu.english,
          stu.maths,
          stu.science,
          stu.social,
          stu.attendance,
        ].join(",")
      );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "StudentData.csv";
    link.click();
  };
  const getClass = (mark) => {
  const parsed = parseInt(mark);
  return !isNaN(parsed) && parsed < 35
    ? "bg-red-100 text-red-700 px-2 py-1 rounded shadow text-sm font-semibold inline-block"
    : "";
};

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = [...students]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(startIndex, startIndex + studentsPerPage);
    

return (
  <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-blue-700">📋 Student List</h2>
      <button
        onClick={handleCSVDownload}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
      >
        ⬇️ Download CSV
      </button>
    </div>

    {/* Loader */}
    {loading ? (
      <div className="flex justify-center items-center py-16">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    ) : (
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="w-full text-base text-center table-auto">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr className="text-blue-700 font-semibold">
              <th className="px-4 py-3">S.No</th>
              {[
                "Name",
                "Roll No",
                "Class",
                "Tamil",
                "English",
                "Maths",
                "Science",
                "Social",
                "Attendance",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((stu, index) => {
              const getClass = (mark) =>
                stu.attendance === "Attend" && parseInt(mark) < 35
                  ? "text-red-600 font-semibold"
                  : "";

              return (
                <tr
                  key={stu._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-3 py-3">{startIndex + index + 1}</td>
                  <td className="px-3 py-3 font-medium">{stu.name}</td>
                  <td className="px-3 py-3">{stu.rollNo}</td>
                  <td className="px-3 py-3">{stu.className}</td>
                 <td className="px-3 py-3">
  <span className={getClass(stu.tamil)}>{stu.tamil}</span>
</td>
<td className="px-3 py-3">
  <span className={getClass(stu.english)}>{stu.english}</span>
</td>
<td className="px-3 py-3">
  <span className={getClass(stu.maths)}>{stu.maths}</span>
</td>
<td className="px-3 py-3">
  <span className={getClass(stu.science)}>{stu.science}</span>
</td>
<td className="px-3 py-3">
  <span className={getClass(stu.social)}>{stu.social}</span>
</td>

                  <td className="px-3 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded font-semibold ${
                        stu.attendance === "Attend"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {stu.attendance}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleEdit(stu)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow-sm transition text-sm"
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}

    {/* Pagination */}
    {!loading && students.length > studentsPerPage && (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="text-blue-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    )}

    {/* Back Button */}
    <div className="mt-10 flex justify-center">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md text-sm sm:text-base transition"
      >
        🔙 Back
      </button>
    </div>

    {/* Edit Modal */}
    {editStudent && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
          <h3 className="text-xl font-bold text-center text-blue-600 mb-6">
            ✍️ Edit Student
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "name",
              "rollNo",
              "className",
              "tamil",
              "english",
              "maths",
              "science",
              "social",
            ].map((field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border border-gray-300 p-2 rounded focus:outline-blue-400"
              />
            ))}
            <select
              name="attendance"
              value={form.attendance}
              onChange={handleChange}
              className="col-span-full border border-gray-300 p-2 rounded"
            >
              <option value="Attend">Attend</option>
              <option value="Not Attend">Not Attend</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setEditStudent(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
