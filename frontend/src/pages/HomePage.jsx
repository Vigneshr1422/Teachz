import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-white-100 py-20">
      <h1 className="text-3xl font-bold mb-6">Teacher Portal</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
