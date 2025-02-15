import React, { useEffect, useState } from "react";
import ReporteAsistencias from "../../components/reportes/ReporteAsistencias";
import ReporteCalificaciones from "../../components/reportes/ReporteCalificaciones";
import { obtenerReporteAsistencias } from '../../api/asistencias';
import { obtenerReporteCalificaciones } from '../../api/tareas';

const ReportesProfesor = () => {
  const [reporteAsistencias, setReporteAsistencias] = useState([]);
  const [reporteCalificaciones, setReporteCalificaciones] = useState([]);

  useEffect(() => {
    obtenerReporteAsistencias().then(response => setReporteAsistencias(response.data));
    obtenerReporteCalificaciones().then(response => setReporteCalificaciones(response.data));
}, []);

  return (
    <div>
      <h2>Reportes del Profesor</h2>
      <ReporteAsistencias datos={reporteAsistencias} />
      <ReporteCalificaciones datos={reporteCalificaciones} />
    </div>
  );
};

export default ReportesProfesor;
