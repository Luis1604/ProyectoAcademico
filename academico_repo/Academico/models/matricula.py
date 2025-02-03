import enum
from sqlalchemy import Column, Integer, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .meta import Base

class EstadoMatricula(enum.Enum):
    activa = "activa"
    suspendida = "suspendida"
    finalizada = "finalizada"

class Matricula(Base):
    __tablename__ = 'matriculas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    id_curso = Column(Integer, ForeignKey('cursos.id'), nullable=False)
    fecha_matricula = Column(Date, nullable=False, default=datetime.utcnow)  # Fecha de matrícula
    estado = Column(Enum(EstadoMatricula), nullable=False, default=EstadoMatricula.activa)

    usuario = relationship("Usuario", back_populates="matriculas")
    curso = relationship("Curso", back_populates="matriculas")
