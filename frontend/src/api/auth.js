import api from "./api";

const API_URL = "http://localhost:6543/api/auth";

export const login = async (email, contrasena) => {
  try {
      const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, contrasena }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error en la autenticación");
      }

      return await response.json();
  } catch (error) {
      console.error("Error en login:", error);
      throw error;
  }
};

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const obtenerUsuarioActual = async () => {
    const response = await api.get("/auth/usuario");
    return response.data;
  };
  
  export const logout = () => {
    return api.post("/auth/logout");
  };
