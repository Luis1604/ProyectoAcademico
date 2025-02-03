import { api } from "./api";

export const login = async (email, password) => {
  const response = await api.post("/login", { email, contrasena: password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};
