import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlusIcon,
  ListBulletIcon,
  EyeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const teacher = localStorage.getItem("teacher");
    if (!teacher) navigate("/login");
  }, [navigate]);

  const teacher = JSON.parse(localStorage.getItem("teacher"));

  const cards = [
    {
      title: "Add Student",
      icon: <UserPlusIcon className="h-6 w-6 mr-2" />,
      color: "bg-blue-600 hover:bg-blue-700",
      to: "/add-student",
    },
    {
      title: "Student List",
      icon: <ListBulletIcon className="h-6 w-6 mr-2" />,
      color: "bg-green-600 hover:bg-green-700",
      to: "/student-list",
    },
    {
      title: "View Results",
      icon: <EyeIcon className="h-6 w-6 mr-2" />,
      color: "bg-yellow-500 hover:bg-yellow-600",
      to: "/student-view",
    },
    {
      title: "Subject Stats",
      icon: <ChartBarIcon className="h-6 w-6 mr-2" />,
      color: "bg-purple-600 hover:bg-purple-700",
      to: "/subject-wise",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">
          Welcome, {teacher?.name || "Teacher"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {cards.map(({ title, icon, color, to }) => (
            <Link
              to={to}
              key={title}
              className={`flex items-center justify-center gap-2 ${color} text-white py-4 rounded-xl shadow-lg text-lg font-medium transition-all duration-300 hover:scale-105 text-center`}
            >
              {icon}
              {title}
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6 sm:mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-md text-base font-semibold transition"
        >
          🔒 Logout
        </button>
      </div>
      </div>

      {/* 🔒 Logout Button */}

    </div>
  );
}
