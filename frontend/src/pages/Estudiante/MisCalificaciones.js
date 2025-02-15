import React, { useEffect, useState } from "react";
import { getCalificacionesEstudiante } from "../../api/tareas";

const MisCalificaciones = () => {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    cargarCalificaciones();
  }, []);

  const cargarCalificaciones = async () => {
    try {
      const data = await getCalificacionesEstudiante();
      setCalificaciones(data);
    } catch (error) {
      console.error("Error al obtener calificaciones:", error);
    }
  };

  return (
    <div>
      <h2>Mis Calificaciones</h2>
      <ul>
        {calificaciones.map((calificacion) => (
          <li key={calificacion.id}>
            <strong>{calificacion.titulo}</strong>: {calificacion.nota}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisCalificaciones;
