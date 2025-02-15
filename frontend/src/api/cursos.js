import api from "./api";

export const getCursos = async () => {
  const response = await api.get("/cursos");
  return response.data;
};

export const getCursosPorProfesor = async (profesorId) => {
  const response = await api.get(`/cursos/profesor/${profesorId}`);
  return response.data;
};

export const createCurso = async (curso) => {
  await api.post("/cursos", curso);
};

export const updateCurso = async (id, curso) => {
  await api.put(`/cursos/${id}`, curso);
};

export const deleteCurso = async (id) => {
  await api.delete(`/cursos/${id}`);
};
