from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Matricula(Base):
    __tablename__ = 'matriculas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    id_curso = Column(Integer, ForeignKey('cursos.id'), nullable=False)

    usuario = relationship("Usuario", back_populates="matriculas")
    curso = relationship("Curso", back_populates="matriculas")
