from pyramid.view import view_config
from pyramid.response import JSONResponse
from academico.services.tarea_service import crear_tarea, obtener_tareas, cambiar_estado_tarea
from academico.models.tarea import EstadoTarea

@view_config(route_name="tarea_crear", renderer="json", request_method="POST", permission="profesor")
def crear_tarea_view(request):
    data = request.json_body
    dbsession = request.dbsession

    id_curso = data.get("id_curso")
    titulo = data.get("titulo")
    descripcion = data.get("descripcion")
    fecha_entrega = data.get("fecha_entrega")

    if not all([id_curso, titulo, fecha_entrega]):
        return JSONResponse({"error": "Faltan datos"}, status=400)

    resultado = crear_tarea(dbsession, id_curso, titulo, descripcion, fecha_entrega)
    return resultado

@view_config(route_name="tarea_listar", renderer="json", request_method="GET", permission="profesor")
def listar_tareas_view(request):
    dbsession = request.dbsession
    id_curso = request.matchdict["id_curso"]

    resultado = obtener_tareas(dbsession, id_curso)
    return resultado

@view_config(route_name="tarea_actualizar", renderer="json", request_method="PATCH", permission="profesor")
def actualizar_estado_tarea_view(request):
    data = request.json_body
    dbsession = request.dbsession

    id_tarea = data.get("id_tarea")
    nuevo_estado = data.get("estado")

    if not all([id_tarea, nuevo_estado]):
        return JSONResponse({"error": "Faltan datos"}, status=400)

    try:
        estado_enum = EstadoTarea[nuevo_estado]
    except KeyError:
        return JSONResponse({"error": "Estado inválido"}, status=400)

    resultado = cambiar_estado_tarea(dbsession, id_tarea, estado_enum)
    return resultado
