import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerUsuarioActual, login, logout } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUsuario = async () => {
      if (!token || usuario) { // ✅ Evita ejecutar si ya hay usuario
        setCargando(false);
        return;
      }

      try {
        const user = await obtenerUsuarioActual();
        setUsuario(user);
        localStorage.setItem("usuario", JSON.stringify(user));
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario"); // ✅ Remueve también usuario
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, [token, usuario]); // ✅ No necesitamos `setToken` ni `setUsuario` como dependencias

  const handleLogin = async ({ email, contrasena }) => {
    setError(null);

    try {
      const data = await login(email, contrasena);

      if (!data?.token || !data?.usuario) {
        throw new Error("Respuesta inválida del servidor.");
      }

      setToken(data.token);
      setUsuario(data.usuario);
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigateBasedOnRole(data.usuario.rol);
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Credenciales incorrectas o problema con el servidor.");
    }
  };

  const navigateBasedOnRole = useCallback((rol) => {
    switch (rol) {
      case "administrador":
        navigate("/admin/dashboard");
        break;
      case "profesor":
        navigate("/profesor/dashboard");
        break;
      case "estudiante":
        navigate("/estudiante/dashboard");
        break;
      default:
        navigate("/");
    }
  }, [navigate]); // ✅ Usamos useCallback para evitar re-render innecesarios

  useEffect(() => {
    if (usuario) {
      navigateBasedOnRole(usuario.rol);
    }
  }, [usuario, navigateBasedOnRole]); // ✅ Sin advertencias de ESLint

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ usuario, token, cargando, error, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
