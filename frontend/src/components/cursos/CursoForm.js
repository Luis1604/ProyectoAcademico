import { useState, useEffect } from "react";
import { createCurso, updateCurso } from "../../api/cursos";
import { getUsuarios } from "../../api/usuarios";

const CursoForm = ({ cursoSeleccionado, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    profesor_asignado: "",
  });

  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    fetchProfesores();
    if (cursoSeleccionado) {
      setFormData({
        nombre: cursoSeleccionado.nombre,
        descripcion: cursoSeleccionado.descripcion,
        profesor_asignado: cursoSeleccionado.profesor_asignado,
      });
    }
  }, [cursoSeleccionado]);

  const fetchProfesores = async () => {
    try {
      const data = await getUsuarios();
      const profesoresFiltrados = data.filter((usuario) => usuario.rol === "profesor");
      setProfesores(profesoresFiltrados);
    } catch (error) {
      console.error("Error al obtener profesores", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cursoSeleccionado) {
        await updateCurso(cursoSeleccionado.id, formData);
      } else {
        await createCurso(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error al guardar curso", error);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">
        {cursoSeleccionado ? "Editar Curso" : "Crear Curso"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="border p-1 w-full"
          />
        </div>
        <div>
          <label className="block">Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="border p-1 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block">Profesor:</label>
          <select
            name="profesor_asignado"
            value={formData.profesor_asignado}
            onChange={handleChange}
            required
            className="border p-1 w-full"
          >
            <option value="">Seleccionar profesor</option>
            {profesores.map((profesor) => (
              <option key={profesor.id} value={profesor.id}>
                {profesor.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CursoForm;
