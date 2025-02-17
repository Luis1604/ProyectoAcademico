import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerUsuarioActual, login, logout } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUsuario = async () => {
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const user = await obtenerUsuarioActual();
        if (user && user.rol) {
          setUsuario(user);
          localStorage.setItem("usuario", JSON.stringify(user)); // Guardar usuario completo
        } else {
          throw new Error("El usuario no tiene un rol asignado.");
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setToken(null);
        setUsuario(null);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, [token]);

  const handleLogin = async ({ email, contrasena }) => {
    try {
      const data = await login(email, contrasena);
      if (!data || !data.token || !data.usuario) {
        throw new Error("Respuesta inválida del servidor.");
      }
  
      setToken(data.token);
      setUsuario(data.usuario);
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
  
      // Redirección según el rol del usuario
      alert(data.usuario.rol);
      switch (data.usuario.rol) {
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
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error al intentar iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };
  

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
    <AuthContext.Provider value={{ usuario, token, cargando, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
