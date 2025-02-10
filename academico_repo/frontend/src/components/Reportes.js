import React, { useState } from "react";
import { descargarReporteAsistencias, descargarReporteCalificaciones } from "../api/reportes";

const Reportes = () => {
  const [idCurso, setIdCurso] = useState("");

  const handleDescargarAsistencias = async () => {
    if (!idCurso) return alert("Ingrese un ID de curso");
    try {
      await descargarReporteAsistencias(idCurso);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDescargarCalificaciones = async () => {
    if (!idCurso) return alert("Ingrese un ID de curso");
    try {
      await descargarReporteCalificaciones(idCurso);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Descargar Reportes</h2>
      <input
        type="text"
        placeholder="ID del Curso"
        value={idCurso}
        onChange={(e) => setIdCurso(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button onClick={handleDescargarAsistencias} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Descargar Asistencias (PDF)
      </button>
      <button onClick={handleDescargarCalificaciones} className="bg-green-500 text-white px-4 py-2 rounded">
        Descargar Calificaciones (Excel)
      </button>
    </div>
  );
};

export default Reportes;
