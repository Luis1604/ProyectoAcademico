const API_URL = "http://localhost:6543/api/reporte"; // Ajusta según tu backend

export const descargarReporteAsistencias = async (idCurso) => {
  const response = await fetch(`${API_URL}/asistencias/${idCurso}/pdf`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al descargar el reporte de asistencias");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reporte_asistencias_${idCurso}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export const descargarReporteCalificaciones = async (idCurso) => {
  const response = await fetch(`${API_URL}/calificaciones/${idCurso}/excel`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al descargar el reporte de calificaciones");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reporte_calificaciones_${idCurso}.xlsx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};
