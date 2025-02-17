import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6543/api",
  headers: {
    "Content-Type": "application/json", // Se asegura de que el backend reciba JSON
  },
});

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
