import { useState, useEffect } from "react";
import { getAsistenciasEstudiante } from "../../api/asistencias";

const MisAsistencias = () => {
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const fetchAsistencias = async () => {
    try {
      const data = await getAsistenciasEstudiante();
      setAsistencias(data);
    } catch (error) {
      console.error("Error al obtener asistencias", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mis Asistencias</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Curso</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map((asistencia) => (
            <tr key={asistencia.id} className="border">
              <td className="border p-2">{asistencia.fecha}</td>
              <td className="border p-2">{asistencia.curso_nombre}</td>
              <td className="border p-2">{asistencia.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisAsistencias;
