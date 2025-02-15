import { useState, useEffect } from "react";
import { getEstudiantesPorCurso } from "../../api/usuarios";
import { registrarAsistencia } from "../../api/asistencias";

const estados = ["presente", "ausente", "tarde", "justificada"];

const AsistenciaForm = ({ cursoId }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencias, setAsistencias] = useState({});

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const data = await getEstudiantesPorCurso(cursoId);
        setEstudiantes(data);
      } catch (error) {
        console.error("Error al obtener estudiantes", error);
      }
    };

    fetchEstudiantes();
  }, [cursoId]);

  const handleChange = (id, estado) => {
    setAsistencias((prevAsistencias) => ({
      ...prevAsistencias,
      [id]: estado
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        Object.entries(asistencias).map(([id, estado]) =>
          registrarAsistencia({ id_usuario: id, id_curso: cursoId, estado })
        )
      );
      alert("Asistencias registradas con éxito");
    } catch (error) {
      console.error("Error al registrar asistencias", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-bold mb-2">Registrar Asistencias</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Estudiante</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id} className="border">
              <td className="border p-2">{estudiante.nombre}</td>
              <td className="border p-2">
                <select
                  value={asistencias[estudiante.id] || "presente"}
                  onChange={(e) => handleChange(estudiante.id, e.target.value)}
                  className="border p-1"
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2">
        Guardar Asistencias
      </button>
    </form>
  );
};

export default AsistenciaForm;
