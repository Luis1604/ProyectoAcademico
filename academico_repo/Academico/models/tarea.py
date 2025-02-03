import enum
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .meta import Base

class EstadoTarea(enum.Enum):
    pendiente = "pendiente"
    entregada = "entregada"
    calificada = "calificada"

class Tarea(Base):
    __tablename__ = 'tareas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_curso = Column(Integer, ForeignKey('cursos.id'), nullable=False)
    titulo = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
    fecha_entrega = Column(DateTime, nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)  # Fecha de creación
    estado = Column(Enum(EstadoTarea), nullable=False, default=EstadoTarea.pendiente)

    curso = relationship("Curso", back_populates="tareas")
