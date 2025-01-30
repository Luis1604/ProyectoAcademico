from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from .meta import Base

class Tarea(Base):
    __tablename__ = 'tareas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_curso = Column(Integer, ForeignKey('cursos.id'), nullable=False)
    titulo = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
    fecha_entrega = Column(Date, nullable=False)

    curso = relationship("Curso", back_populates="tareas")
