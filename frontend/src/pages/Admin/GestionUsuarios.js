import React, { useEffect, useState } from "react";
import UserList from "../../components/usuarios/UserList";
import UserForm from "../../components/usuarios/UserForm";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../../api/usuarios";
import "../../styles/Gestion.css";

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
    <div className="page-container">
      <header className="page-header">
        <h2>👤 Gestión de Usuarios</h2>
      </header>
      <main className="page-main">
        {!isFormOpen ? (
          <div className="gestion-content">
            <button className="btn-primary" onClick={() => setIsFormOpen(true)}>Agregar Usuario</button>
            <UserList usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        ) : (
          <UserForm usuario={selectedUser} onSave={handleCreateOrUpdate} onCancel={() => setIsFormOpen(false)} />
        )}
      </main>
    </div>
  );
};

export default GestionUsuarios;
