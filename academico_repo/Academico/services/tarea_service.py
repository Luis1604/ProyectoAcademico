from datetime import datetime
from sqlalchemy.orm import Session
from Academico.models.tarea import Tarea, EstadoTarea

def crear_tarea(dbsession: Session, id_curso: int, titulo: str, descripcion: str, fecha_entrega: datetime):
    tarea = Tarea(
        id_curso=id_curso,
        titulo=titulo,
        descripcion=descripcion,
        fecha_entrega=fecha_entrega,
        estado=EstadoTarea.pendiente
    )
    dbsession.add(tarea)
    dbsession.flush()
    return {"message": "Tarea creada exitosamente", "tarea_id": tarea.id}

def obtener_tareas(dbsession: Session, id_curso: int):
    tareas = dbsession.query(Tarea).filter_by(id_curso=id_curso).all()
    return [{"id": t.id, "titulo": t.titulo, "descripcion": t.descripcion, "fecha_entrega": t.fecha_entrega, "estado": t.estado.value} for t in tareas]

def cambiar_estado_tarea(dbsession: Session, id_tarea: int, nuevo_estado: EstadoTarea):
    tarea = dbsession.query(Tarea).filter_by(id=id_tarea).first()
    if not tarea:
        return {"error": "Tarea no encontrada"}
    
    tarea.estado = nuevo_estado
    return {"message": f"Tarea actualizada a {nuevo_estado.value}"}
