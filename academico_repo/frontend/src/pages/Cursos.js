import { useEffect, useState } from "react";
import { api } from "../api/api";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await api.get("/cursos");
      setCursos(response.data);
    };
    fetchCursos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Cursos</h1>
      <ul className="mt-4">
        {cursos.map((curso) => (
          <li key={curso.id} className="p-2 border-b">{curso.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cursos;
