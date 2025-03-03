from pyramid.config import Configurator # type: ignore
from Academico.controllers import auth, cursos, reportes, tareas, usuarios, asistencias, options


def includeme(config):
    config.add_route('home', '/')
    # Autenticación
    config.add_route('register', '/api/auth/register')
    config.add_route('login', '/api/auth/login')
    config.add_route('logout', '/api/auth/logout')
    config.add_route('recuperar', '/api/auth/recuperar')
    config.add_route('usuario', '/api/auth/usuario')

    config.add_route('crear_usuario', '/api/usuarios/crear')
    config.add_route('editar_usuario', '/api/usuarios/editar')
    config.add_route('eliminar_usuario', '/api/usuarios/eliminar')

    # Gestión de Cursos
    config.add_route('curso_crear', '/api/curso/crear')
    config.add_route('curso_matricular', '/api/curso/matricular')
    config.add_route('asignar_curso', '/api/usuarios/{usuario_id}/asignar-curso')

    # Gestión de Asistencias
    config.add_route('registrar_asistencia', '/api/asistencia/registrar')
    config.add_route('consultar_asistencias_por_curso', '/api/asistencia/curso/{curso_id}')
    config.add_route('consultar_asistencias_por_estudiante', '/api/asistencia/{estudiante_id}')
    
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
    config.add_route("reporte_asistencias_pdf_view", "/api/reporte/asistencias/{id_curso}/pdf")
    config.add_route("reporte_calificaciones_excel_view", "/api/reporte/calificaciones/{id_curso}/excel")

    #Manejo de solicitudes
    config.add_route('options', '*path', request_method='OPTIONS')

    # Asignar las vistas a las rutas
    config.add_view(auth.registrar_usuario, route_name='register', renderer='json')
    config.add_view(auth.login_view, route_name='login', renderer='json')
    config.add_view(auth.recuperar_contrasena, route_name='recuperar', renderer='json')
    config.add_view(auth.obtener_usuario, route_name='usuario', renderer='json')

    config.add_view(usuarios.asignar_curso, route_name='asignar_curso', renderer='json', permission='assign')
    config.add_view(usuarios.crear_usuario, route_name='crear_usuario', renderer='json', permission='create')
    config.add_view(usuarios.editar_usuario, route_name='editar_usuario', renderer='json', permission='create')
    config.add_view(usuarios.eliminar_usuario, route_name='eliminar_usuario', renderer='json', permission='create')


    config.add_view(cursos.crear_curso, route_name='curso_crear', renderer='json')
    config.add_view(cursos.matricular_estudiante, route_name='curso_matricular', renderer='json')

    config.add_view(asistencias.registrar_asistencia, route_name='registrar_asistencia', renderer='json')
    config.add_view(asistencias.consultar_asistencias_por_estudiante, route_name='consultar_asistencias_por_estudiante', renderer='json')
    config.add_view(asistencias.consultar_asistencias_por_curso, route_name='consultar_asistencias_por_curso', renderer='json')

    config.add_view(usuarios.notificar_usuario, route_name='notificar_usuario', renderer='json')

    config.add_view(reportes.reporte_asistencias_pdf_view, route_name='reporte_asistencias_pdf_view', renderer='json')
    config.add_view(reportes.reporte_calificaciones_excel_view, route_name='reporte_calificaciones_excel_view', renderer='json')

    config.add_view(options.options_view, route_name='options', renderer='json')

