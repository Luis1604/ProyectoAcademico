from Academico.models.usuario import Usuario

def autenticar_usuario(dbsession, email, contrasena):
    """Verifica credenciales de usuario"""
    usuario = dbsession.query(Usuario).filter(Usuario.email == email).first()
    if usuario and usuario.verify_password(contrasena):
        return {"mensaje": "Autenticación exitosa", "usuario_id": usuario.id, "rol": usuario.rol.name}
    return {"error": "Email o contraseña incorrectos"}
