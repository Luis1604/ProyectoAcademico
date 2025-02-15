import React, { useState } from "react";

const TareaForm = ({ onSubmit, tareaInicial }) => {
  const [tarea, setTarea] = useState(
    tareaInicial || {
      titulo: "",
      descripcion: "",
      fecha_entrega: "",
    }
  );

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tarea);
    setTarea({ titulo: "", descripcion: "", fecha_entrega: "" }); // Reiniciar formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={tarea.titulo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={tarea.descripcion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Fecha de Entrega:</label>
        <input
          type="date"
          name="fecha_entrega"
          value={tarea.fecha_entrega}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{tareaInicial ? "Actualizar" : "Crear"} Tarea</button>
    </form>
  );
};

export default TareaForm;
