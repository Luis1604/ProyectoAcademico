from academico.models import Matricula, Usuario, Curso
from sqlalchemy.exc import IntegrityError

def matricular_estudiante(dbsession, usuario_id, curso_id):
    """
    Matricula a un estudiante en un curso, verificando si ya está inscrito.
    """
    estudiante = dbsession.query(Usuario).filter_by(id=usuario_id, rol="estudiante").first()
    curso = dbsession.query(Curso).filter_by(id=curso_id).first()

    if not estudiante:
        return {"error": "El usuario no es estudiante o no existe"}
    if not curso:
        return {"error": "El curso no existe"}

    try:
        matricula = Matricula(id_usuario=usuario_id, id_curso=curso_id)
        dbsession.add(matricula)
        dbsession.flush()
        return {"mensaje": "Estudiante matriculado correctamente"}
    except IntegrityError:
        return {"error": "El estudiante ya está matriculado en este curso"}
