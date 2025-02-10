from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy
from pyramid.config import Configurator
from Academico.models.meta import initialize_engine, initialize_session, Base
from .meta import Base
from .usuario import Usuario
from .curso import Curso
from .matricula import Matricula
from .tarea import Tarea
from .asistencia import Asistencia
from .notificacion import Notificacion

configure_mappers()

def get_engine(settings, prefix='sqlalchemy.'):
    """Obtiene el motor de base de datos desde la configuración."""
    return engine_from_config(settings, prefix)

def get_session_factory(engine):
    """Crea una fábrica de sesiones."""
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory

def get_tm_session(session_factory, transaction_manager, request=None):
    """Obtiene una sesión de base de datos con soporte para transacciones."""
    dbsession = session_factory(info={"request": request})
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager
    )
    return dbsession

def includeme(config):
    """Inicializa la base de datos en Pyramid."""
    settings = config.get_settings()

    # Inicializar el engine con la configuración de Pyramid
    engine = initialize_engine(settings["sqlalchemy.url"])

    # Inicializar la fábrica de sesiones
    session_factory = initialize_session(engine)

    # Registrar el engine y la sesión en Pyramid
    config.registry["db_engine"] = engine
    config.registry["db_session_factory"] = session_factory

    # Hacer que cada request tenga acceso a db_session
    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm, request=r),
        "dbsession",  # Nombre del atributo en request
        reify=True
    )

    # Asegurar que los modelos estén vinculados al engine
    Base.metadata.bind = engine