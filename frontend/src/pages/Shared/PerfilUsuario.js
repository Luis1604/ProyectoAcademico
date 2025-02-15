import React from "react";
import useAuth from "../../hooks/useAuth";

const PerfilUsuario = () => {
  const { usuario } = useAuth();

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Rol:</strong> {usuario.rol}</p>
    </div>
  );
};

export default PerfilUsuario;
