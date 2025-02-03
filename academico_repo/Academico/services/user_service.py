from sqlalchemy.exc import IntegrityError
from academico.models.usuario import Usuario

def registrar_usuario(dbsession, nombre, email, contrasena, rol):
    """Registra un nuevo usuario con contraseña cifrada"""
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
