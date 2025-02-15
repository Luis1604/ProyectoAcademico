import React, { useEffect, useState } from 'react';
import { obtenerNotificaciones } from '../../api/notificaciones';

const NotificationBell = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;

  useEffect(() => {
    const cargarNotificaciones = async () => {
      const data = await obtenerNotificaciones();
      setNotificaciones(data);
    };
    cargarNotificaciones();
  }, []);

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      🔔
      {notificacionesNoLeidas > 0 && (
        <span style={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '4px 8px',
          fontSize: '12px',
        }}>
          {notificacionesNoLeidas}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
