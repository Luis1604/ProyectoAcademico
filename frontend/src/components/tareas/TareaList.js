import React from "react";

const TareaList = ({ tareas, onUpdate, onDelete, onEntregar }) => {
  return (
    <div>
      <h3>Lista de Tareas</h3>
      {tareas.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id}>
              <strong>{tarea.titulo}</strong>
              <p>{tarea.descripcion}</p>
              <p>Entrega: {new Date(tarea.fecha_entrega).toLocaleDateString()}</p>
              <p>Estado: {tarea.estado}</p>
              {onUpdate && (
                <button onClick={() => onUpdate(tarea.id, tarea)}>Editar</button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(tarea.id)}>Eliminar</button>
              )}
              {onEntregar && (
                <input
                  type="file"
                  onChange={(e) => onEntregar(tarea.id, e.target.files[0])}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TareaList;
