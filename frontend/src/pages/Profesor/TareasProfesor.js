import React, { useEffect, useState } from "react";
import { getTareasPorCurso, crearTarea, actualizarTarea, eliminarTarea } from "../../api/tareas";
import TareaList from "../../components/tareas/TareaList";
import TareaForm from "../../components/tareas/TareaForm";

const TareasProfesor = ({ cursoId }) => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, [cursoId]);

  const cargarTareas = async () => {
    try {
      const data = await getTareasPorCurso(cursoId);
      setTareas(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  const handleCrearTarea = async (nuevaTarea) => {
    try {
      await crearTarea(nuevaTarea);
      cargarTareas();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const handleActualizarTarea = async (tareaId, tareaActualizada) => {
    try {
      await actualizarTarea(tareaId, tareaActualizada);
      cargarTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleEliminarTarea = async (tareaId) => {
    try {
      await eliminarTarea(tareaId);
      cargarTareas();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div>
      <h2>Gestión de Tareas</h2>
      <TareaForm onSubmit={handleCrearTarea} />
      <TareaList tareas={tareas} onUpdate={handleActualizarTarea} onDelete={handleEliminarTarea} />
    </div>
  );
};

export default TareasProfesor;
