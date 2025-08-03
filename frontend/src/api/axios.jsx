// frontend/src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000/api" // local backend
    : "https://teachz.onrender.com/api", // production backend
  withCredentials: true,
});


export default instance;
