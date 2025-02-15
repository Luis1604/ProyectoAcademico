import api from "./api";

/**
 * Obtener tareas de un curso específico.
 * @param {number} cursoId - ID del curso.
 * @returns {Promise<Array>} - Lista de tareas.
 */
export const getTareasPorCurso = async (cursoId) => {
  try {
    const response = await api.get(`/tareas/curso/${cursoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas del curso:", error);
    throw error;
  }
};

/**
 * Obtener las tareas asignadas al estudiante autenticado.
 * @returns {Promise<Array>} - Lista de tareas.
 */
export const getTareasEstudiante = async () => {
  try {
    const response = await api.get("/tareas/estudiante");
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas del estudiante:", error);
    throw error;
  }
};

/**
 * Crear una nueva tarea.
 * @param {Object} tarea - Datos de la tarea.
 * @returns {Promise<Object>} - Tarea creada.
 */
export const crearTarea = async (tarea) => {
  try {
    const response = await api.post("/tareas", tarea);
    return response.data;
  } catch (error) {
    console.error("Error al crear tarea:", error);
    throw error;
  }
};

/**
 * Actualizar una tarea existente.
 * @param {number} tareaId - ID de la tarea.
 * @param {Object} tarea - Datos actualizados.
 * @returns {Promise<Object>} - Tarea actualizada.
 */
export const actualizarTarea = async (tareaId, tarea) => {
  try {
    const response = await api.put(`/tareas/${tareaId}`, tarea);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    throw error;
  }
};

/**
 * Eliminar una tarea.
 * @param {number} tareaId - ID de la tarea.
 * @returns {Promise<void>}
 */
export const eliminarTarea = async (tareaId) => {
  try {
    await api.delete(`/tareas/${tareaId}`);
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw error;
  }
};

/**
 * Entregar una tarea con un archivo adjunto.
 * @param {number} tareaId - ID de la tarea.
 * @param {File} archivo - Archivo de la tarea.
 * @returns {Promise<Object>} - Confirmación de entrega.
 */
export const entregarTarea = async (tareaId, archivo) => {
  const formData = new FormData();
  formData.append("archivo", archivo);

  try {
    const response = await api.post(`/tareas/${tareaId}/entregar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al entregar tarea:", error);
    throw error;
  }
};

/**
 * Obtener las calificaciones del estudiante autenticado.
 * @returns {Promise<Array>} - Lista de calificaciones.
 */
export const getCalificacionesEstudiante = async () => {
  try {
    const response = await api.get("/calificaciones/estudiante");
    return response.data;
  } catch (error) {
    console.error("Error al obtener calificaciones:", error);
    throw error;
  }
};

// Obtener listado de tareas
export const obtenerTareas = async () => {
  return await api.get('/tareas');
};

// Obtener reporte de calificaciones (antes estaba en reportes.js)
export const obtenerReporteCalificaciones = async () => {
  return await api.get('/tareas/reporte');
};