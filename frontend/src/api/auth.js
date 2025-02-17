import api from "./api";

export const login = async (email, contrasena) => {
  try {
    const response = await api.post("/auth/login", { email, contrasena });
    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const obtenerUsuarioActual = async () => {
  const response = await api.get("/auth/usuario");
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};
