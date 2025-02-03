from pyramid.config import Configurator
from pyramid.security import Allow, Everyone, Authenticated
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from .models.meta import initialize_engine, initialize_session, Base
import redis
import zope.sqlalchemy

class Root:
    __name__ = __parent__ = None
    __acl__ = [
        (Allow, 'group:admin', 'create'),
        (Allow, 'group:admin', 'edit'),
        (Allow, 'group:admin', 'delete'),
        (Allow, 'group:admin', 'assign'),
        (Allow, 'group:profesor', 'view'),
        (Allow, 'group:profesor', 'edit'),
        (Allow, 'group:estudiante', 'view'),
        (Allow, Everyone, 'view'),
    ]

    def __init__(self, request):
        pass

def main(global_config, **settings):
    """Retorna la aplicación Pyramid."""
    
    # Crear política de autenticación y autorización
    authn_policy = AuthTktAuthenticationPolicy(secret='mysecret', cookie_name='auth_tkt')
    authz_policy = ACLAuthorizationPolicy()

    # Configurar Pyramid con autenticación y autorización
    config = Configurator(settings=settings, root_factory=Root)
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)

    # Incluir pyramid_tm para gestionar transacciones
    config.include('pyramid_tm')

    # Configurar SQLAlchemy
    engine = initialize_engine(settings["sqlalchemy.url"])
    session_factory = initialize_session(engine)
    config.registry['db_session_factory'] = session_factory

    # Configurar Redis
    redis_url = settings.get("redis.url", "redis://localhost:6379/0")
    redis_client = redis.Redis.from_url(redis_url, decode_responses=True)
    config.registry["redis_client"] = redis_client

    # Agregar Redis a cada request
    config.add_request_method(lambda r: redis_client, 'redis', reify=True)

    # Configurar sesión gestionada por zope.sqlalchemy
    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm, request=r),
        'dbsession',
        reify=True
    )

    # Incluir rutas y vistas
    config.include('.routes')
    config.scan()

    return config.make_wsgi_app()

def get_tm_session(session_factory, transaction_manager, request=None):
    """Retorna una sesión de SQLAlchemy gestionada por zope.sqlalchemy."""
    dbsession = session_factory(info={"request": request})
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession
