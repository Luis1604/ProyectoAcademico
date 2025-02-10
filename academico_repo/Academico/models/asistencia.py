import enum
from sqlalchemy import Column, Integer, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship
from .meta import Base

class Estado(enum.Enum):
    presente = 'presente'
    ausente = 'ausente'
    tarde = 'tarde'
    justificada = 'justificada'

class Asistencia(Base):
    __tablename__ = 'asistencias'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    id_curso = Column(Integer, ForeignKey('cursos.id'), nullable=False)
    fecha = Column(Date, nullable=False)
    estado = Column(Enum(Estado), nullable=False)

    usuario = relationship("Usuario", back_populates="asistencias")
    curso = relationship("Curso", back_populates="asistencias")

