from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from .meta import Base
import enum
import bcrypt

class Rol(enum.Enum):
    administrador = 'admin'
    profesor = 'profesor'
    estudiante = 'estudiante'

class Usuario(Base):
    __tablename__ = 'usuarios'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    rol = Column(Enum(Rol), nullable=False)  
    email = Column(String, unique=True, nullable=False)
    contrasena_hash = Column(String, nullable=False)  # Guardamos el hash de la contraseña

    matriculas = relationship("Matricula", back_populates="usuario")
    asistencias = relationship("Asistencia", back_populates="usuario")
    notificaciones = relationship("Notificacion", back_populates="usuario")
    cursos = relationship("Curso", back_populates="profesor")

    # Método para generar hash de contraseña
    @staticmethod
    def hash_password(password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Método para verificar contraseña
    def verify_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.contrasena_hash.encode('utf-8'))
