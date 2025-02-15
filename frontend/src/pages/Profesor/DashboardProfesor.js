import React from "react";
import { Link } from "react-router-dom";

const DashboardProfesor = () => {
  return (
    <div>
      <h2>Dashboard Profesor</h2>
      <ul>
        <li><Link to="/profesor/tareas">Gestionar Tareas</Link></li>
        <li><Link to="/profesor/asistencias">Registrar Asistencias</Link></li>
        <li><Link to="/profesor/reportes">Ver Reportes</Link></li>
      </ul>
    </div>
  );
};

export default DashboardProfesor;
