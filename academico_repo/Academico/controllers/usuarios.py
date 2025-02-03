from pyramid.view import view_config
from .services.notificaciones import NotificacionService
from pyramid.security import authenticated_userid, Allow
from .services.usuarios import UsuarioService
from .models import Usuario

@view_config(route_name='crear_usuario', permission='create', renderer='json')
def crear_usuario(request):
    """Crea un nuevo usuario."""
    nombre = request.json_body['nombre']
    email = request.json_body['email']
    contrasena = request.json_body['contrasena']
    rol = request.json_body['rol']

    # Obtener sesión de la base de datos
    dbsession = request.dbsession

    # Crear servicio de usuarios
    usuario_service = UsuarioService(dbsession)

    # Crear usuario
    try:
        usuario = usuario_service.crear_usuario(nombre, email, contrasena, rol)
        return {'message': f"Usuario {usuario.nombre} creado con éxito", 'id': usuario.id}
    except ValueError as e:
        return {'error': str(e)}

@view_config(route_name='editar_usuario', permission='edit', renderer='json')
def editar_usuario(request):
    """Edita un usuario existente."""
    usuario_id = int(request.matchdict['usuario_id'])
    nombre = request.json_body.get('nombre')
    email = request.json_body.get('email')
    contrasena = request.json_body.get('contrasena')
    rol = request.json_body.get('rol')

    # Obtener sesión de la base de datos
    dbsession = request.dbsession

    # Crear servicio de usuarios
    usuario_service = UsuarioService(dbsession)

    try:
        usuario = usuario_service.editar_usuario(usuario_id, nombre, email, contrasena, rol)
        return {'message': f"Usuario {usuario.nombre} editado con éxito", 'id': usuario.id}
    except ValueError as e:
        return {'error': str(e)}

@view_config(route_name='eliminar_usuario', permission='delete', renderer='json')
def eliminar_usuario(request):
    """Elimina un usuario existente."""
    usuario_id = int(request.matchdict['usuario_id'])

    # Obtener sesión de la base de datos
    dbsession = request.dbsession

    # Crear servicio de usuarios
    usuario_service = UsuarioService(dbsession)

    try:
        usuario_service.eliminar_usuario(usuario_id)
        return {'message': f"Usuario con ID {usuario_id} eliminado con éxito"}
    except ValueError as e:
        return {'error': str(e)}

@view_config(route_name='asignar_curso', permission='assign', renderer='json')
def asignar_curso(request):
    """Asigna un curso a un profesor."""
    usuario_id = int(request.matchdict['usuario_id'])
    curso_id = int(request.json_body['curso_id'])

    # Obtener sesión de la base de datos
    dbsession = request.dbsession

    # Crear servicio de usuarios
    usuario_service = UsuarioService(dbsession)

    try:
        usuario = usuario_service.asignar_curso_a_profesor(usuario_id, curso_id)
        return {'message': f"Curso {curso_id} asignado a {usuario.nombre}"}
    except ValueError as e:
        return {'error': str(e)}

@view_config(route_name='notificar_usuario', permission='create')
def notificar_usuario(request):
    """Notifica a un usuario sobre un evento."""
    usuario_id = request.matchdict['usuario_id']
    mensaje = "Tienes una nueva tarea pendiente."
    tipo = "Tarea"

    # Obtener sesión de la base de datos
    dbsession = request.dbsession

    # Crear servicio de notificaciones
    servicio_notificaciones = NotificacionService(dbsession)

    # Crear la notificación
    notificacion = servicio_notificaciones.crear_notificacion(usuario_id, mensaje, tipo)

    # Enviar notificación por email (opcional)
    usuario = dbsession.query(Usuario).get(usuario_id)
    servicio_notificaciones.enviar_notificacion_email(usuario, mensaje)

    return {'message': f'Notificación enviada a {usuario.email}'}
