// frontend/src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://teachz.onrender.com/api",
  withCredentials: true, // ✅ Add this line to handle CORS cookies/headers
});

export default instance;
