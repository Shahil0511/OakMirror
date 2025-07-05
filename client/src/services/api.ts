import axios from "axios";

const api = axios.create({
  baseURL: "https://oakmirror.onrender.com/api/",
  // baseURL: " http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth tokenß
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
