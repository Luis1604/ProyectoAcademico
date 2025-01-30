from sqlalchemy import Column, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship
from .meta import Base

class Asistencia(Base):
    __tablename__ = 'asistencias'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    id_curso = Column(Integer, ForeignKey('cursos.id'), nullable=False)
    fecha = Column(Date, nullable=False)
    presente = Column(Integer, nullable=False)  # 1 para presente, 0 para ausente

    usuario = relationship("Usuario", back_populates="asistencias")
    curso = relationship("Curso", back_populates="asistencias")
