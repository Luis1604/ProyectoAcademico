from pyramid.view import view_config
from pyramid.response import Response
from Academico.services.asistencia_service import registrar_asistencia, consultar_asistencias_por_estudiante, consultar_asistencias_por_curso

@view_config(route_name='registrar_asistencia', renderer='json', request_method='POST', permission='profesor')
def registrar_asistencia_view(request):
    """
    Vista para registrar asistencia (solo profesores).
    """
    data = request.json_body
    dbsession = request.dbsession
    usuario_id = data.get("usuario_id")
    curso_id = data.get("curso_id")
    estado = data.get("estado")

    if not all([usuario_id, curso_id, estado]):
        return Response(json={"error": "Faltan datos"}, status=400)

    resultado = registrar_asistencia(dbsession, usuario_id, curso_id, estado)
    return resultado

@view_config(route_name='consultar_asistencias_por_estudiante', renderer='json', request_method='GET', permission='estudiante')
def consultar_asistencias_view(request):
    """
    Vista para consultar asistencias (solo estudiantes y administradores).
    """
    dbsession = request.dbsession
    usuario_id = request.authenticated_userid  # Usar request.authenticated_userid

    if not usuario_id:
        return Response(json={"error": "Usuario no autenticado"}, status=401)

    resultado = consultar_asistencias_por_estudiante(dbsession, usuario_id)
    return resultado


@view_config(route_name='consultar_asistencias_por_curso', renderer='json', request_method='GET', permission='admin')
def consultar_asistencias_curso_view(request):
    """
    Vista para consultar asistencias por curso (solo administradores).
    """
    dbsession = request.dbsession
    curso_id = request.matchdict.get("curso_id")

    if not curso_id:
        return Response(json={"error": "Curso no especificado"}, status=400)

    resultado = consultar_asistencias_por_curso(dbsession, curso_id)
    return resultado
