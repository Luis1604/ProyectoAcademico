from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Curso(Base):
    __tablename__ = 'cursos'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
    profesor_asignado = Column(Integer, ForeignKey('usuarios.id'), nullable=False)

    # Relación con el profesor
    profesor = relationship("Usuario", back_populates="cursos_asignados")

    # Relación con otras tablas
    tareas = relationship("Tarea", back_populates="curso")
    matriculas = relationship("Matricula", back_populates="curso")
    asistencias = relationship("Asistencia", back_populates="curso")
