import React, { createContext, useState, useEffect } from "react";
import { obtenerNotificaciones } from "../api/notificaciones";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        const data = await obtenerNotificaciones();
        setNotificaciones(data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    cargarNotificaciones();
  }, []);

  return (
    <NotificationContext.Provider value={{ notificaciones, setNotificaciones }}>
      {children}
    </NotificationContext.Provider>
  );
};
