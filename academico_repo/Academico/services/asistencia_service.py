from academico.models import Asistencia, Usuario, Curso
from sqlalchemy.exc import IntegrityError
from datetime import datetime

def registrar_asistencia(dbsession, usuario_id, curso_id, estado):
    """
    Registra la asistencia de un estudiante en un curso con un estado específico.
    """
    estudiante = dbsession.query(Usuario).filter_by(id=usuario_id, rol="estudiante").first()
    curso = dbsession.query(Curso).filter_by(id=curso_id).first()

    if not estudiante:
        return {"error": "El usuario no es estudiante o no existe"}
    if not curso:
        return {"error": "El curso no existe"}
    if estado not in ["presente", "ausente", "tarde", "justificada"]:
        return {"error": "Estado de asistencia inválido"}

    try:
        nueva_asistencia = Asistencia(id_usuario=usuario_id, id_curso=curso_id, fecha=datetime.utcnow(), estado=estado)
        dbsession.add(nueva_asistencia)
        dbsession.flush()
        return {"mensaje": "Asistencia registrada correctamente"}
    except IntegrityError:
        return {"error": "Error al registrar la asistencia"}

def consultar_asistencias_por_estudiante(dbsession, usuario_id):
    """
    Obtiene todas las asistencias de un estudiante.
    """
    estudiante = dbsession.query(Usuario).filter_by(id=usuario_id, rol="estudiante").first()
    if not estudiante:
        return {"error": "El usuario no es estudiante o no existe"}

    asistencias = dbsession.query(Asistencia).filter_by(id_usuario=usuario_id).all()
    return [{"curso_id": a.id_curso, "fecha": a.fecha.strftime("%Y-%m-%d"), "estado": a.estado.value} for a in asistencias]

def consultar_asistencias_por_curso(dbsession, curso_id):
    """
    Obtiene todas las asistencias de un curso.
    """
    curso = dbsession.query(Curso).filter_by(id=curso_id).first()
    if not curso:
        return {"error": "El curso no existe"}

    asistencias = dbsession.query(Asistencia).filter_by(id_curso=curso_id).all()
    return [{"estudiante_id": a.id_usuario, "fecha": a.fecha.strftime("%Y-%m-%d"), "estado": a.estado.value} for a in asistencias]
