import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading
    try {
      const res = await axios.post("/auth/signup", form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false); // ✅ Stop loading always
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg p-6 rounded-xl mx-4 sm:mx-0">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading} // ✅ Disabled when loading
            className={`w-full py-2 rounded text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"} {/* ✅ Dynamic text */}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={() => navigate("/login")} className="text-blue-600">
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
