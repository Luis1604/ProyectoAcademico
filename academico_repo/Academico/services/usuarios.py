from .models import Usuario
from sqlalchemy.exc import IntegrityError

class UsuarioService:
    def __init__(self, dbsession):
        self.dbsession = dbsession

    def crear_usuario(self, nombre, email, contrasena, rol):
        """Crea un nuevo usuario."""
        usuario = Usuario(
            nombre=nombre,
            email=email,
            contrasena=contrasena,  # Recuerda que deberías encriptar la contraseña antes de guardarla
            rol=rol
        )
        self.dbsession.add(usuario)
        try:
            self.dbsession.commit()
        except IntegrityError:
            self.dbsession.rollback()
            raise ValueError(f"El correo {email} ya está registrado.")
        return usuario

    def editar_usuario(self, usuario_id, nombre=None, email=None, contrasena=None, rol=None):
        """Edita los detalles de un usuario."""
        usuario = self.dbsession.query(Usuario).get(usuario_id)
        if not usuario:
            raise ValueError(f"Usuario con ID {usuario_id} no encontrado.")
        
        if nombre:
            usuario.nombre = nombre
        if email:
            usuario.email = email
        if contrasena:
            usuario.contrasena = contrasena
        if rol:
            usuario.rol = rol
        
        self.dbsession.commit()
        return usuario

    def eliminar_usuario(self, usuario_id):
        """Elimina un usuario."""
        usuario = self.dbsession.query(Usuario).get(usuario_id)
        if not usuario:
            raise ValueError(f"Usuario con ID {usuario_id} no encontrado.")
        
        self.dbsession.delete(usuario)
        self.dbsession.commit()

    def asignar_curso_a_profesor(self, usuario_id, curso_id):
        """Asigna un curso a un profesor."""
        usuario = self.dbsession.query(Usuario).get(usuario_id)
        if usuario and usuario.rol == 'profesor':
            usuario.curso_id = curso_id
            self.dbsession.commit()
            return usuario
        else:
            raise ValueError("Este usuario no es un profesor o no existe.")
