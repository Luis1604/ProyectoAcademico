import { useState, useEffect } from "react";
import { getUsuarios, deleteUsuario } from "../../api/usuarios";

const UserList = ({ onEdit }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUsuario(id);
        fetchUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Lista de Usuarios</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border">
              <td className="border p-2">{usuario.id}</td>
              <td className="border p-2">{usuario.nombre}</td>
              <td className="border p-2">{usuario.rol}</td>
              <td className="border p-2">{usuario.email}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => onEdit(usuario)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDelete(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
