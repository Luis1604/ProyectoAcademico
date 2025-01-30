from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .meta import Base

class Usuario(Base):
    __tablename__ = 'usuarios'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    rol = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    contrasena = Column(String, nullable=False)

    # Relación con la tabla de matrículas
    matriculas = relationship("Matricula", back_populates="usuario")
    # Relación con la tabla de asistencias
    asistencias = relationship("Asistencia", back_populates="usuario")
    # Relación con la tabla de notificaciones
    notificaciones = relationship("Notificacion", back_populates="usuario")
