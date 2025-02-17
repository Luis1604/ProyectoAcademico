import React, { useEffect, useState } from "react";
import ReporteAsistencias from "../../components/reportes/ReporteAsistencias";
import ReporteCalificaciones from "../../components/reportes/ReporteCalificaciones";
import { obtenerReporteAsistencias } from '../../api/asistencias';
import { obtenerReporteCalificaciones } from '../../api/tareas';
import "../../styles/Dashboard.css";

const DashboardAdmin = () => {
    const [reporteAsistencias, setReporteAsistencias] = useState([]);
    const [reporteCalificaciones, setReporteCalificaciones] = useState([]);

    useEffect(() => {
        obtenerReporteAsistencias().then(response => setReporteAsistencias(response.data));
        obtenerReporteCalificaciones().then(response => setReporteCalificaciones(response.data));
    }, []);

    return (
        <div className="page-container">
            <header className="page-header">
                <h2>📊 Dashboard Administrador</h2>
            </header>
            <main className="page-main">
                <div className="reportes-container">
                    <ReporteAsistencias datos={reporteAsistencias} />
                    <ReporteCalificaciones datos={reporteCalificaciones} />
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
