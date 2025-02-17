from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from Academico.models.usuario import Usuario, Rol
import os

# Configuración de la base de datos (ajusta la URL según tu configuración)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://luix:ieZxj5YlYxqv1XsBQs3deYCcyO2UYakG@dpg-cuievdlumphs7380aahg-a.oregon-postgres.render.com/academicobd_tvnh")
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def crear_usuario_admin():
    email_admin = "luisbravo1604@gmail.com"
    nombre_admin = "Luis Bravo"
    password_admin = "@lux246810"

    # Verificar si el usuario ya existe
    admin_existente = session.query(Usuario).filter_by(email=email_admin).first()
    if admin_existente:
        print("❌ El usuario administrador ya existe.")
        return

    # Crear el usuario administrador
    nuevo_admin = Usuario(
        nombre=nombre_admin,
        rol=Rol.administrador,
        email=email_admin,
        contrasena_hash=Usuario.hash_password(password_admin)
    )

    # Guardar en la base de datos
    session.add(nuevo_admin)
    session.commit()
    print("✅ Usuario administrador creado con éxito.")

if __name__ == "__main__":
    crear_usuario_admin()
