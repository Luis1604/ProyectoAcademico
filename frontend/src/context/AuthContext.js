import React, { createContext, useState, useEffect } from "react";
import { obtenerUsuarioActual, login, logout } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const user = await obtenerUsuarioActual();
        setUsuario(user);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, []);

  const handleLogin = async (credenciales) => {
    const user = await login(credenciales);
    setUsuario(user);
  };

  const handleLogout = () => {
    logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
