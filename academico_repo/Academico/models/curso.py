from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .meta import Base

class Curso(Base):
    __tablename__ = 'cursos'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
    profesor_asignado = Column(Integer, nullable=False)

    # Relación con la tabla de tareas
    tareas = relationship("Tarea", back_populates="curso")
    # Relación con la tabla de matrículas
    matriculas = relationship("Matricula", back_populates="curso")
    # Relación con la tabla de asistencias
    asistencias = relationship("Asistencia", back_populates="curso")
