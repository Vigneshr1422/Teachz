import axios from "axios";

const instance = axios.create({
  baseURL: "https://teachz.onrender.com/api",
});


export default instance;
