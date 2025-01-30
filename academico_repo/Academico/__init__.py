# Academico/__init__.py
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
import zope.sqlalchemy
from .models.meta import initialize_engine, initialize_session, Base

def main(global_config, **settings):
    """Retorna la aplicación Pyramid."""
    config = Configurator(settings=settings)

    # Incluye pyramid_tm para gestionar transacciones
    config.include('pyramid_tm')

    # Configura el motor de SQLAlchemy
    engine = initialize_engine(settings["sqlalchemy.url"])
    Base.metadata.bind = engine

    # Configura la fábrica de sesiones
    session_factory = initialize_session(engine)
    config.registry['db_session_factory'] = session_factory

    # Registra la sesión con zope.sqlalchemy
    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm, request=r),
        'dbsession',
        reify=True
    )

    # Incluye las rutas y vistas de tu aplicación
    config.include('.routes')
    config.scan()

    return config.make_wsgi_app()

def get_tm_session(session_factory, transaction_manager, request=None):
    """Retorna una sesión de SQLAlchemy gestionada por zope.sqlalchemy."""
    dbsession = session_factory(info={"request": request})
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession