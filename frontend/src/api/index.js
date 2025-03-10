import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ajusta la URL según tu backend
  headers: { "Content-Type": "application/json" },
});

export default api; // Exportación por defecto
