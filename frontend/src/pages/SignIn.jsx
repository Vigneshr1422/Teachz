import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // 👈 Loading state

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 Set loading true when request starts
    try {
      const res = await axios.post("/auth/login", form);
      alert("Login successful!");
      localStorage.setItem("teacher", JSON.stringify(res.data.teacher));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false); // 👈 Always turn off loading
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg p-6 rounded-xl mx-4 sm:mx-0">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading} // 👈 Disable while loading
            className={`w-full py-2 rounded text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"} {/* 👈 Dynamic text */}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="text-green-600"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
