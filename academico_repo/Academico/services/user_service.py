from sqlalchemy.exc import IntegrityError # type: ignore
from Academico.models.usuario import Usuario

def registrar_usuario(dbsession, nombre, email, contrasena, rol):
    """Registra un nuevo usuario con contraseña cifrada"""
     # Verificar si el usuario ya existe
    usuario_existente = dbsession.query(Usuario).filter(Usuario.email == email).first()
    if usuario_existente:
        return {"error": "El email ya está en uso"}
    
    nuevo_usuario = Usuario(
        nombre=nombre,
        email=email,
        contrasena_hash=Usuario.hash_password(contrasena),
        rol=rol
    )
    dbsession.add(nuevo_usuario)
    try:
        dbsession.commit()
        return {"mensaje": "Usuario registrado con éxito"}
    except IntegrityError:
        dbsession.rollback()
        return {"error": "El email ya está en uso"}
    
def obtener_usuario(dbsession, usuario_id=None, email=None):
    """Obtiene un usuario por ID o email"""
    query = dbsession.query(Usuario)

    if usuario_id:
        query = query.filter(Usuario.id == usuario_id)
    elif email:
        query = query.filter(Usuario.email == email)

    return query.first()
