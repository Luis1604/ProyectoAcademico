from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .meta import Base

class Notificacion(Base):
    __tablename__ = 'notificaciones'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    mensaje = Column(String, nullable=False)
    fecha_envio = Column(DateTime, nullable=False, default=datetime.utcnow)
    leida = Column(Boolean, nullable=False, default=False)  # False para no leída, True para leída

    usuario = relationship("Usuario", back_populates="notificaciones")
