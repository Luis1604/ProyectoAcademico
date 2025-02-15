import { useState, useEffect } from "react";
import { getAsistenciasPorCurso } from "../../api/asistencias";

const AsistenciaList = ({ cursoId }) => {
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const data = await getAsistenciasPorCurso(cursoId);
        setAsistencias(data);
      } catch (error) {
        console.error("Error al obtener asistencias", error);
      }
    };

    fetchAsistencias();
  }, [cursoId]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Asistencias del Curso</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Estudiante</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map((asistencia) => (
            <tr key={asistencia.id} className="border">
              <td className="border p-2">{asistencia.fecha}</td>
              <td className="border p-2">{asistencia.usuario_nombre}</td>
              <td className="border p-2">{asistencia.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsistenciaList;
