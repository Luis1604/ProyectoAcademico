import api from "./api";

export const getUsuarios = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

export const getEstudiantesPorCurso = async (cursoId) => {
  const response = await api.get(`/usuarios/estudiantes/${cursoId}`);
  return response.data;
};

export const createUsuario = async (usuario) => {
  await api.post("/usuarios", usuario);
};

export const updateUsuario = async (id, usuario) => {
  await api.put(`/usuarios/${id}`, usuario);
};

export const deleteUsuario = async (id) => {
  await api.delete(`/usuarios/${id}`);
};
