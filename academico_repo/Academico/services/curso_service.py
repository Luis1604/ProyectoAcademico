from academico.models import Curso, Usuario
from sqlalchemy.exc import IntegrityError

def crear_curso(dbsession, nombre, descripcion, profesor_id):
    """
    Crea un nuevo curso y lo asocia con un profesor.
    """
    profesor = dbsession.query(Usuario).filter_by(id=profesor_id, rol="profesor").first()
    
    if not profesor:
        return {"error": "El profesor no existe o no tiene el rol adecuado"}

    try:
        nuevo_curso = Curso(
            nombre=nombre,
            descripcion=descripcion,
            profesor_asignado=profesor_id
        )
        dbsession.add(nuevo_curso)
        dbsession.flush()
        return {"mensaje": "Curso creado exitosamente", "curso_id": nuevo_curso.id}
    except IntegrityError:
        return {"error": "Error al crear el curso, verifique los datos"}
