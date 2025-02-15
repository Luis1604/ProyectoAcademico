import { useState, useEffect } from "react";
import AsistenciaList from "../../components/asistencias/AsistenciaList";
import AsistenciaForm from "../../components/asistencias/AsistenciaForm";
import { getCursosPorProfesor } from "../../api/cursos";

const AsistenciasProfesor = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const data = await getCursosPorProfesor();
      setCursos(data);
    } catch (error) {
      console.error("Error al obtener cursos", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registro de Asistencias</h2>
      <label className="block mb-2">Seleccionar curso:</label>
      <select
        className="border p-2 w-full mb-4"
        value={cursoSeleccionado || ""}
        onChange={(e) => setCursoSeleccionado(e.target.value)}
      >
        <option value="">Seleccione un curso</option>
        {cursos.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.nombre}
          </option>
        ))}
      </select>
      {cursoSeleccionado && (
        <>
          <AsistenciaForm cursoId={cursoSeleccionado} />
          <AsistenciaList cursoId={cursoSeleccionado} />
        </>
      )}
    </div>
  );
};

export default AsistenciasProfesor;
