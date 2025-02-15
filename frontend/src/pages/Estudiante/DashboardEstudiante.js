import React from "react";
import { Link } from "react-router-dom";

const DashboardEstudiante = () => {
  return (
    <div>
      <h2>Dashboard Estudiante</h2>
      <ul>
        <li><Link to="/estudiante/tareas">Mis Tareas</Link></li>
        <li><Link to="/estudiante/asistencias">Mis Asistencias</Link></li>
        <li><Link to="/estudiante/calificaciones">Mis Calificaciones</Link></li>
      </ul>
    </div>
  );
};

export default DashboardEstudiante;
