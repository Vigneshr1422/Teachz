// frontend/src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000/api" // 👈 Local backend
    : "https://teachz.onrender.com/api", // 👈 Live Render backend
  withCredentials: true, // 👈 Required for cookies/sessions
});

export default instance;
