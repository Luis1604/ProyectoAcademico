import api from "./api";

export const login = async (email, contrasena) => {
  try {
    const response = await api.post("/auth/login", { email, contrasena });

    if (!response?.data?.token || !response?.data?.usuario) {
      throw new Error("Respuesta incompleta del servidor: falta token o usuario");
    }

    return response.data;
  } catch (error) {
    console.error("Error en login:", error?.response?.data?.error || error.message);
    throw new Error("Error en el proceso de login. Verifique sus credenciales.");
  }
};

export const obtenerUsuarioActual = async () => {
  try {
    const response = await api.get("/auth/usuario");

    if (!response?.data) {
      throw new Error("Respuesta incompleta del servidor al obtener usuario");
    }

    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error?.response?.data?.error || error.message);
    throw new Error("No se pudo obtener la información del usuario. Intente nuevamente.");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Error al cerrar sesión:", error?.response?.data?.error || error.message);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};
