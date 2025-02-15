import { useEffect, useState } from 'react';
import { obtenerReporteCalificaciones } from '../../api/reportes';

const ReporteCalificaciones = () => {
    const [calificaciones, setCalificaciones] = useState([]);

    useEffect(() => {
        obtenerReporteCalificaciones().then(response => {
            setCalificaciones(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Reporte de Calificaciones</h2>
            <ul>
                {calificaciones.map((calificacion) => (
                    <li key={calificacion.id}>{calificacion.nota}</li>
                ))}
            </ul>
        </div>
    );
};

export default ReporteCalificaciones;
