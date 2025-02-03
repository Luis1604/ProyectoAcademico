from pyramid.view import view_config
from pyramid.response import Response
from academico.services.curso_service import crear_curso
from academico.services.matricula_service import matricular_estudiante
from pyramid.security import authenticated_userid

@view_config(route_name='curso_crear', renderer='json', request_method='POST', permission='admin')
def curso_crear_view(request):
    """
    Vista para la creación de un curso (solo administradores).
    """
    data = request.json_body
    dbsession = request.dbsession
    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    profesor_id = data.get("profesor_id")

    if not all([nombre, profesor_id]):
        return Response(json={"error": "Faltan datos"}, status=400)

    resultado = crear_curso(dbsession, nombre, descripcion, profesor_id)
    return resultado

@view_config(route_name='curso_matricular', renderer='json', request_method='POST', permission='admin')
def curso_matricular_view(request):
    """
    Vista para matricular a un estudiante en un curso (solo administradores).
    """
    data = request.json_body
    dbsession = request.dbsession
    usuario_id = data.get("usuario_id")
    curso_id = data.get("curso_id")

    if not all([usuario_id, curso_id]):
        return Response(json={"error": "Faltan datos"}, status=400)

    resultado = matricular_estudiante(dbsession, usuario_id, curso_id)
    return resultado
