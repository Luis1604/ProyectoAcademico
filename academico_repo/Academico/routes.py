from pyramid.config import Configurator
from Academico.controllers import auth, cursos, reportes, tareas, usuarios, asistencias

def includeme(config):
    # Autenticación
    config.add_route('register', '/api/auth/register')
    config.add_route('login', '/api/auth/login')
    config.add_route('logout', '/api/auth/logout')

    # Gestión de Cursos
    config.add_route('curso_crear', '/api/curso/crear')
    config.add_route('curso_matricular', '/api/curso/matricular')

    # Gestión de Asistencias
    config.add_route('asistencia_registrar', '/api/asistencia/registrar')
    config.add_route('asistencia_consultar', '/api/asistencia/{estudiante_id}')
    config.add_route('consultar_asistencias_curso', '/api/asistencia/curso/{curso_id}')

    # Gestión de Tareas
    config.add_route('tarea_crear', '/api/tarea/crear')
    config.add_route('tarea_consultar', '/api/tarea/{estudiante_id}')
    config.add_route("tarea_listar", "/api/tarea/{id_curso}/listar")
    config.add_route("tarea_actualizar", "/api/tarea/actualizar")

    # Notificaciones
    config.add_route('notificar_usuario', '/api/usuarios/{usuario_id}/notificar')

    # Reportes
    config.add_route('reporte_asistencias', '/api/cursos/{curso_id}/reporte/asistencias')
    config.add_route('reporte_calificaciones', '/api/cursos/{curso_id}/reporte/calificaciones')
    config.add_route("reporte_asistencias_pdf", "/api/reporte/asistencias/{id_curso}/pdf")
    config.add_route("reporte_calificaciones_excel", "/api/reporte/calificaciones/{id_curso}/excel")


    # Asignar las vistas a las rutas
    config.add_view(auth.register, route_name='register', renderer='json')
    config.add_view(auth.login, route_name='login', renderer='json')
    config.add_view(auth.logout, route_name='logout', renderer='json')

    config.add_view(cursos.crear_curso, route_name='curso_crear', renderer='json')
    config.add_view(cursos.matricular_estudiante, route_name='curso_matricular', renderer='json')

    config.add_view(asistencias.registrar_asistencia, route_name='asistencia_registrar', renderer='json')
    config.add_view(asistencias.consultar_asistencias, route_name='asistencia_consultar', renderer='json')

    config.add_view(tareas.crear_tarea, route_name='tarea_crear', renderer='json')
    config.add_view(tareas.consultar_tareas, route_name='tarea_consultar', renderer='json')

    config.add_view(usuarios.notificar_usuario, route_name='notificar_usuario', renderer='json')

    config.add_view(reportes.reporte_asistencias, route_name='reporte_asistencias', renderer='json')
    config.add_view(reportes.reporte_calificaciones, route_name='reporte_calificaciones', renderer='json')
