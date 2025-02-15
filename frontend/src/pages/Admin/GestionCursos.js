import { useState } from "react";
import CursoList from "../../components/cursos/CursoList";
import CursoForm from "../../components/cursos/CursoForm";

const GestionCursos = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const handleEdit = (curso) => {
    setCursoSeleccionado(curso);
  };

  const handleSave = () => {
    setCursoSeleccionado(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Cursos</h2>
      <CursoForm cursoSeleccionado={cursoSeleccionado} onSave={handleSave} />
      <CursoList onEdit={handleEdit} />
    </div>
  );
};

export default GestionCursos;
