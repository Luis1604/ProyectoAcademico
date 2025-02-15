import api from './api';

export const obtenerReporteAsistencias = async () => {
    return await api.get('/asistencias/reporte');  // Nueva ruta basada en la entidad real
};

export const obtenerReporteCalificaciones = async () => {
    return await api.get('/tareas/reporte');  // Nueva ruta basada en la entidad real
};
