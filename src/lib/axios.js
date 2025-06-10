import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5200/api" : "https://chewata-backend.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});