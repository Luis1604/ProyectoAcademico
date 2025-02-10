import smtplib
from email.mime.text import MIMEText
from Academico.models.usuario import Usuario
import random
import string

def generar_token():
    """Genera un token de 6 caracteres para recuperación de contraseña"""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

def enviar_correo(destinatario, token):
    """Envía un email con el token de recuperación"""
    remitente = "tu_correo@gmail.com"
    contraseña = "tu_contraseña"

    msg = MIMEText(f"Tu código de recuperación es: {token}")
    msg["Subject"] = "Recuperación de Contraseña"
    msg["From"] = remitente
    msg["To"] = destinatario

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(remitente, contraseña)
        server.sendmail(remitente, destinatario, msg.as_string())
        server.quit()
        return {"mensaje": "Correo enviado con éxito"}
    except Exception as e:
        return {"error": f"Error enviando correo: {str(e)}"}

def recuperar_contrasena(dbsession, email):
    """Envía un código de recuperación si el email está registrado"""
    usuario = dbsession.query(Usuario).filter(Usuario.email == email).first()
    if not usuario:
        return {"error": "Email no registrado"}

    token = generar_token()
    usuario.token_recuperacion = token
    dbsession.commit()

    return enviar_correo(email, token)
