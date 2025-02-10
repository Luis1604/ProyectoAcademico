import io
import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session
from Academico.models.asistencia import Asistencia
from Academico.models.tarea import Tarea
from Academico.models.usuario import Usuario
from Academico.models.curso import Curso

def generar_reporte_asistencias_pdf(dbsession: Session, id_curso: int):
    """Genera un PDF con las asistencias de un curso"""
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.setFont("Helvetica", 12)
    c.drawString(100, 750, f"Reporte de Asistencias - Curso {id_curso}")

    asistencias = (
        dbsession.query(Asistencia, Usuario.nombre)
        .join(Usuario, Usuario.id == Asistencia.id_usuario)
        .filter(Asistencia.id_curso == id_curso)
        .all()
    )

    y_position = 730
    for asistencia, nombre in asistencias:
        c.drawString(100, y_position, f"{nombre} - {asistencia.fecha} - {asistencia.estado.value}")
        y_position -= 20

    c.save()
    buffer.seek(0)
    return buffer

def generar_reporte_calificaciones_excel(dbsession: Session, id_curso: int):
    """Genera un archivo Excel con las calificaciones de los estudiantes"""
    tareas = (
        dbsession.query(Tarea, Usuario.nombre)
        .join(Usuario, Usuario.id == Tarea.id_curso)
        .filter(Tarea.id_curso == id_curso)
        .all()
    )

    data = [
        {"Estudiante": nombre, "Tarea": tarea.titulo, "Estado": tarea.estado.value}
        for tarea, nombre in tareas
    ]

    df = pd.DataFrame(data)
    buffer = io.BytesIO()
    with pd.ExcelWriter(buffer, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Calificaciones")

    buffer.seek(0)
    return buffer
