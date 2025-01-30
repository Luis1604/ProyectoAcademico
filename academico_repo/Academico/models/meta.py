from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData
from sqlalchemy.orm import configure_mappers

# Configuración de convenciones de nombres para Alembic
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=NAMING_CONVENTION)
Base = declarative_base(metadata=metadata)

# Inicializar el motor globalmente (se sobrescribirá en runtime)
engine = None

# Función para inicializar el motor
def initialize_engine(sqlalchemy_url):
    """Crea el motor de base de datos."""
    global engine
    engine = create_engine(sqlalchemy_url)
    return engine

# Función para inicializar la sesión
def initialize_session(engine):
    """Crea una fábrica de sesiones."""
    return scoped_session(sessionmaker(bind=engine))

# Importa todos los modelos aquí
from .usuario import Usuario
from .curso import Curso
from .matricula import Matricula
from .tarea import Tarea
from .asistencia import Asistencia
from .notificacion import Notificacion

# Configura los mappers (necesario para relaciones entre modelos)
configure_mappers()