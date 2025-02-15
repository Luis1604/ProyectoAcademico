import { useState, useEffect } from "react";
import { createUsuario, updateUsuario } from "../../api/usuarios";

const UserForm = ({ usuarioSeleccionado, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "estudiante",
    contrasena: "",
  });

  useEffect(() => {
    if (usuarioSeleccionado) {
      setFormData({
        nombre: usuarioSeleccionado.nombre,
        email: usuarioSeleccionado.email,
        rol: usuarioSeleccionado.rol,
        contrasena: "",
      });
    }
  }, [usuarioSeleccionado]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuarioSeleccionado) {
        await updateUsuario(usuarioSeleccionado.id, formData);
      } else {
        await createUsuario(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error al guardar usuario", error);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">
        {usuarioSeleccionado ? "Editar Usuario" : "Crear Usuario"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="border p-1 w-full"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-1 w-full"
          />
        </div>
        <div>
          <label className="block">Rol:</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="border p-1 w-full"
          >
            <option value="administrador">Administrador</option>
            <option value="profesor">Profesor</option>
            <option value="estudiante">Estudiante</option>
          </select>
        </div>
        {!usuarioSeleccionado && (
          <div>
            <label className="block">Contraseña:</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              className="border p-1 w-full"
            />
          </div>
        )}
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
