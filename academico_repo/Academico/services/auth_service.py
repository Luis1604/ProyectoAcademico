import jwt
import datetime
import os
from Academico.models.usuario import Usuario

# Obtener clave secreta de entorno
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "clave_super_secreta")

def autenticar_usuario(dbsession, email, contrasena):
    """Verifica credenciales de usuario y genera token"""
    usuario = dbsession.query(Usuario).filter(Usuario.email == email).first()

    if not usuario:
        return {"error": "Email no registrado"}

    if not usuario.verify_password(contrasena):
        return {"error": "Contraseña incorrecta"}

    # Generar token con JWT
    payload = {
        'sub': usuario.id,
        'rol': usuario.rol.name,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=8)  # Expira en 8 horas
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    return {
        "mensaje": "Autenticación exitosa",
        "token": token,
        "usuario": {
            "id": usuario.id,
            "email": usuario.email,
            "rol": usuario.rol.name
        }
    }
