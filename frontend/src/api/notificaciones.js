import api from './api';

// Obtener notificaciones del usuario
export const obtenerNotificaciones = async () => {
  try {
    const response = await api.get('/notificaciones');
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    return [];
  }
};

// Marcar notificación como leída
export const marcarNotificacionLeida = async (id) => {
  try {
    await api.put(`/notificaciones/${id}/leida`);
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);
  }
};
