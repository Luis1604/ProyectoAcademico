import { useEffect, useState } from 'react';
import { obtenerReporteAsistencias } from '../../api/asistencias'; // Import actualizado

const ReporteAsistencias = () => {
    const [asistencias, setAsistencias] = useState([]);

    useEffect(() => {
        obtenerReporteAsistencias().then(response => {
            setAsistencias(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Reporte de Asistencias</h2>
            <table>
                <thead>
                    <tr>
                        <th>Estudiante</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {asistencias.map((asistencia) => (
                        <tr key={asistencia.id}>
                            <td>{asistencia.usuario_nombre}</td>
                            <td>{asistencia.fecha}</td>
                            <td>{asistencia.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default ReporteAsistencias;
