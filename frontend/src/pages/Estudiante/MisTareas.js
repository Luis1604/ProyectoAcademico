import React, { useEffect, useState } from "react";
import { getTareasEstudiante, entregarTarea } from "../../api/tareas";
import TareaList from "../../components/tareas/TareaList";

const MisTareas = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const data = await getTareasEstudiante();
      setTareas(data);
    } catch (error) {
      console.error("Error al obtener tareas del estudiante:", error);
    }
  };

  const handleEntregarTarea = async (tareaId, archivo) => {
    try {
      await entregarTarea(tareaId, archivo);
      cargarTareas();
    } catch (error) {
      console.error("Error al entregar tarea:", error);
    }
  };

  return (
    <div>
      <h2>Mis Tareas</h2>
      <TareaList tareas={tareas} onEntregar={handleEntregarTarea} />
    </div>
  );
};

export default MisTareas;
