import React, { useEffect, useState } from "react";
import UserList from "../../components/usuarios/UserList";
import UserForm from "../../components/usuarios/UserForm";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../../api/usuarios";

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const handleCreateOrUpdate = async (usuario) => {
    if (usuario.id) {
      await updateUsuario(usuario);
    } else {
      await createUsuario(usuario);
    }
    cargarUsuarios();
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteUsuario(id);
    cargarUsuarios();
  };

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setIsFormOpen(true);
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      {!isFormOpen ? (
        <>
          <button onClick={() => setIsFormOpen(true)}>Agregar Usuario</button>
          <UserList usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      ) : (
        <UserForm usuario={selectedUser} onSave={handleCreateOrUpdate} onCancel={() => setIsFormOpen(false)} />
      )}
    </div>
  );
};

export default GestionUsuarios;
