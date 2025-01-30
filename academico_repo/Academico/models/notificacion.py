from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .meta import Base

class Notificacion(Base):
    __tablename__ = 'notificaciones'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    mensaje = Column(String, nullable=False)
    fecha_envio = Column(DateTime, nullable=False)

    usuario = relationship("Usuario", back_populates="notificaciones")
