import { useState, useEffect } from "react";
import { getCursos, deleteCurso } from "../../api/cursos";

const CursoList = ({ onEdit }) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const data = await getCursos();
      setCursos(data);
    } catch (error) {
      console.error("Error al obtener cursos", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este curso?")) {
      try {
        await deleteCurso(id);
        fetchCursos();
      } catch (error) {
        console.error("Error al eliminar curso", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Lista de Cursos</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Profesor</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id} className="border">
              <td className="border p-2">{curso.id}</td>
              <td className="border p-2">{curso.nombre}</td>
              <td className="border p-2">{curso.descripcion}</td>
              <td className="border p-2">{curso.profesor_nombre}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => onEdit(curso)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDelete(curso.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CursoList;
