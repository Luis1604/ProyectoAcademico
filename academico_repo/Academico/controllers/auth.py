import logging
import json
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.security import NO_PERMISSION_REQUIRED
from Academico.services.user_service import registrar_usuario
from Academico.services.auth_service import autenticar_usuario
from Academico.services.recovery_service import recuperar_contrasena


# Configuración del logger
logger = logging.getLogger(__name__)
logging.basicConfig(
    filename="auth_logs.log",  # Guarda logs en este archivo
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

@view_config(route_name='register', renderer='json', request_method='POST', permission='admin')
def registro_view(request):
    try:
        data = request.json_body
        dbsession = request.dbsession
        nombre = data.get("nombre")
        email = data.get("email")
        contrasena = data.get("contrasena")
        rol = data.get("rol")

        if not all([nombre, email, contrasena, rol]):
            logger.warning("Intento de registro con datos incompletos.")
            return Response(json.dumps({"error": "Faltan datos"}), content_type="application/json", status=400)

        resultado = registrar_usuario(dbsession, nombre, email, contrasena, rol)
        logger.info(f"Usuario registrado: {email} - Rol: {rol}")
        return resultado

    except Exception as e:
        logger.error(f"Error en el registro: {str(e)}", exc_info=True)
        return Response(json.dumps({"error": "Error interno del servidor"}), content_type="application/json", status=500)

@view_config(route_name='login', renderer='json', request_method='POST', permission=NO_PERMISSION_REQUIRED)
def login_view(request):
    try:
        data = request.json_body
        dbsession = request.dbsession
        email = data.get("email")
        contrasena = data.get("contrasena")

        if not email or not contrasena:
            logger.warning("Intento de inicio de sesión con datos incompletos.")
            return Response(
                json_body={"error": "Email y contraseña requeridos"},
                status=400
            )

        resultado = autenticar_usuario(dbsession, email, contrasena)
        logger.info(f"Inicio de sesión exitoso: {email}")
        return resultado

    except Exception as e:
        logger.error(f"Error en login para {email if 'email' in locals() else 'Desconocido'}: {str(e)}", exc_info=True)
        return Response(
            json_body={"error": "Error interno del servidor en el login"},
            status=500
        )

@view_config(route_name='recuperar', renderer='json', request_method='POST', permission=NO_PERMISSION_REQUIRED)
def recuperar_contrasena_view(request):
    try:
        data = request.json_body
        dbsession = request.dbsession
        email = data.get("email")

        if not email:
            logger.warning("Intento de recuperación de contraseña sin email.")
            return Response(json.dumps({"error": "Email requerido"}), content_type="application/json", status=400)

        resultado = recuperar_contrasena(dbsession, email)
        logger.info(f"Solicitud de recuperación de contraseña para: {email}")
        return resultado

    except Exception as e:
        logger.error(f"Error en recuperación de contraseña para {email}: {str(e)}", exc_info=True)
        return Response(json.dumps({"error": "Error interno del servidor"}), content_type="application/json", status=500)


