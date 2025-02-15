import React, { useEffect, useState } from 'react';
import { obtenerNotificaciones, marcarNotificacionLeida } from '../../api/notificaciones';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const cargarNotificaciones = async () => {
    const data = await obtenerNotificaciones();
    setNotificaciones(data);
  };

  const manejarClick = async (id) => {
    await marcarNotificacionLeida(id);
    cargarNotificaciones();
  };

  return (
    <div>
      <h2>Notificaciones</h2>
      <ul>
        {notificaciones.map((notif) => (
          <li key={notif.id} style={{ backgroundColor: notif.leida ? 'lightgray' : 'white' }}>
            <p>{notif.mensaje}</p>
            <small>{new Date(notif.fecha_envio).toLocaleString()}</small>
            {!notif.leida && <button onClick={() => manejarClick(notif.id)}>Marcar como leída</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notificaciones;
