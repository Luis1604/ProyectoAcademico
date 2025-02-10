from pyramid.view import view_config
from pyramid.response import Response
from Academico.services.reportes import generar_reporte_asistencias_pdf, generar_reporte_calificaciones_excel

@view_config(route_name="reporte_asistencias_pdf_view", request_method="GET", permission="admin")
def reporte_asistencias_pdf_view(request):
    dbsession = request.dbsession
    id_curso = request.matchdict["id_curso"]

    buffer = generar_reporte_asistencias_pdf(dbsession, int(id_curso))

    response = Response(content_type="application/pdf")
    response.content_disposition = f"attachment; filename=reporte_asistencias_{id_curso}.pdf"
    response.body = buffer.getvalue()
    return response

@view_config(route_name="reporte_calificaciones_excel_view", request_method="GET", permission="admin")
def reporte_calificaciones_excel_view(request):
    dbsession = request.dbsession
    id_curso = request.matchdict["id_curso"]

    buffer = generar_reporte_calificaciones_excel(dbsession, int(id_curso))

    response = Response(content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    response.content_disposition = f"attachment; filename=reporte_calificaciones_{id_curso}.xlsx"
    response.body = buffer.getvalue()
    return response
