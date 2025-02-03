from datetime import datetime
from .models import Notificacion, Usuario

class NotificacionService:
    def __init__(self, dbsession):
        self.dbsession = dbsession

    def crear_notificacion(self, usuario_id, mensaje, tipo):
        """Crea una nueva notificación para un usuario."""
        notificacion = Notificacion(
            usuario_id=usuario_id,
            mensaje=mensaje,
            tipo=tipo,
            fecha=datetime.now()
        )
        self.dbsession.add(notificacion)
        self.dbsession.commit()
        return notificacion

    def obtener_notificaciones_usuario(self, usuario_id):
        """Obtiene todas las notificaciones de un usuario."""
        return self.dbsession.query(Notificacion).filter(Notificacion.usuario_id == usuario_id).all()

    def enviar_notificacion_email(self, usuario, mensaje):
        """Simula el envío de una notificación por correo electrónico."""
        # Aquí deberías integrar con algún servicio de correo como SendGrid, SMTP, etc.
        print(f"Enviando correo a {usuario.email}: {mensaje}")
