from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from .models import Base

def main(global_config, **settings):
    # Configurar base de datos
    engine = engine_from_config(settings, 'sqlalchemy.')
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    
    config = Configurator(settings=settings)
    config.registry['dbsession'] = DBSession

    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.scan()
    return config.make_wsgi_app()
