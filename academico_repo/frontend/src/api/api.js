import axios from "axios";

const API_URL = "http://localhost:6543"; // Ajusta la URL según el backend

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
