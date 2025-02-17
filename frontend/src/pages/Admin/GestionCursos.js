import { useState } from "react";
import CursoList from "../../components/cursos/CursoList";
import CursoForm from "../../components/cursos/CursoForm";
import "../../styles/Gestion.css";

const GestionCursos = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const handleEdit = (curso) => {
    setCursoSeleccionado(curso);
  };

  const handleSave = () => {
    setCursoSeleccionado(null);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>📚 Gestión de Cursos</h2>
      </header>
      <main className="page-main">
        <div className="gestion-content">
          <CursoForm cursoSeleccionado={cursoSeleccionado} onSave={handleSave} />
          <CursoList onEdit={handleEdit} />
        </div>
      </main>
    </div>
  );
};

export default GestionCursos;
