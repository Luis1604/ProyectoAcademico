import api from "./api";

/**
 * Obtener asistencias de un curso específico.
 * @param {number} cursoId - ID del curso.
 * @returns {Promise<Array>} - Lista de asistencias.
 */
export const getAsistenciasPorCurso = async (cursoId) => {
  if (!cursoId) {
    console.error("Error: cursoId es requerido");
    throw new Error("El ID del curso es obligatorio");
  }

  try {
    const response = await api.get(`/asistencias/curso/${cursoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener asistencias por curso:", error.response?.data?.message || error);
    throw error;
  }
};

/**
 * Obtener asistencias del estudiante autenticado.
 * @returns {Promise<Array>} - Lista de asistencias del estudiante.
 */
export const getAsistenciasEstudiante = async () => {
  try {
    const response = await api.get("/asistencias/estudiante");
    return response.data;
  } catch (error) {
    console.error("Error al obtener asistencias del estudiante:", error.response?.data?.message || error);
    throw error;
  }
};

/**
 * Registrar una asistencia.
 * @param {Object} asistencia - Datos de la asistencia.
 * @param {number} asistencia.id_usuario - ID del estudiante.
 * @param {number} asistencia.id_curso - ID del curso.
 * @param {string} asistencia.estado - Estado de la asistencia (presente, ausente, tarde, justificada).
 * @returns {Promise<Object>} - Asistencia registrada.
 */
export const registrarAsistencia = async (asistencia) => {
  if (!asistencia || !asistencia.id_usuario || !asistencia.id_curso || !asistencia.estado) {
    console.error("Error: Datos de asistencia incompletos");
    throw new Error("Todos los campos de asistencia son obligatorios");
  }

  try {
    const response = await api.post("/asistencias", asistencia);
    return response.data;
  } catch (error) {
    console.error("Error al registrar asistencia:", error.response?.data?.message || error);
    throw error;
  }
};

/**
 * Editar una asistencia existente.
 * @param {number} asistenciaId - ID de la asistencia a editar.
 * @param {Object} asistencia - Datos actualizados.
 * @returns {Promise<Object>} - Asistencia actualizada.
 */
export const actualizarAsistencia = async (asistenciaId, asistencia) => {
  if (!asistenciaId) {
    console.error("Error: asistenciaId es requerido");
    throw new Error("El ID de la asistencia es obligatorio");
  }

  try {
    const response = await api.put(`/asistencias/${asistenciaId}`, asistencia);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar asistencia:", error.response?.data?.message || error);
    throw error;
  }
};

/**
 * Eliminar una asistencia.
 * @param {number} asistenciaId - ID de la asistencia a eliminar.
 * @returns {Promise<void>}
 */
export const eliminarAsistencia = async (asistenciaId) => {
  if (!asistenciaId) {
    console.error("Error: asistenciaId es requerido");
    throw new Error("El ID de la asistencia es obligatorio");
  }

  try {
    await api.delete(`/asistencias/${asistenciaId}`);
  } catch (error) {
    console.error("Error al eliminar asistencia:", error.response?.data?.message || error);
    throw error;
  }
};

/**
 * Obtener listado de asistencias.
 * @returns {Promise<Array>} - Lista de asistencias.
 */
export const obtenerAsistencias = async () => {
  try {
    const response = await api.get('/asistencias');
    return response.data;
  } catch (error) {
    console.error("Error al obtener asistencias:", error.response?.data?.message || error);
    throw error;
  }
};

/**
 * Obtener reporte de asistencias.
 * @returns {Promise<Object>} - Reporte de asistencias.
 */
export const obtenerReporteAsistencias = async () => {
  try {
    const response = await api.get('/asistencias/reporte');
    return response.data;
  } catch (error) {
    console.error("Error al obtener reporte de asistencias:", error.response?.data?.message || error);
    throw error;
  }
};
