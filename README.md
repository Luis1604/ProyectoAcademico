# Plataforma Educativa

## Descripción
Esta es una plataforma educativa que permite gestionar usuarios (administradores, profesores y estudiantes), cursos, asistencias, tareas, calificaciones y reportes. Los administradores tienen acceso completo al sistema, mientras que los profesores gestionan las asistencias y tareas, y los estudiantes pueden consultar su progreso.

## Requisitos Funcionales

### 1. Gestión de Usuarios

#### Roles del sistema:
- **Administrador**:
  - Crear, editar y eliminar usuarios (estudiantes, profesores).
  - Asignar cursos a profesores.
  - Generar reportes.
  
- **Profesor**:
  - Registrar asistencias de sus clases.
  - Crear tareas y calificar a los estudiantes.
  - Ver reportes de sus cursos.
  
- **Estudiante**:
  - Consultar su progreso (calificaciones, tareas entregadas).
  - Recibir notificaciones.

#### Registro/Login:
- Registro de nuevos usuarios (solo por el administrador).
- Inicio de sesión con email y contraseña.
- Recuperación de contraseñas por email.

### 2. Gestión de Cursos
- **Creación de Cursos**:
  - El administrador puede crear cursos con los siguientes datos:
    - Nombre del curso.
    - Descripción.
    - Profesor asignado.
    - Horario.
  
- **Asignación de Estudiantes**:
  - Los estudiantes se matriculan en cursos desde su cuenta (o son asignados por el administrador).

### 3. Asistencias
- **Registro de Asistencias**:
  - Los profesores registran la asistencia de los estudiantes en sus clases (opciones: presente, ausente, tardanza).
  - Fecha y curso de la clase.
  
- **Consulta de Asistencias**:
  - Los estudiantes pueden consultar sus asistencias.
  - El administrador puede ver el registro completo de asistencias por curso y estudiante.

### 4. Tareas y Calificaciones
- **Creación de Tareas**:
  - Los profesores pueden crear tareas para sus cursos con:
    - Título.
    - Descripción.
    - Fecha de entrega.
  
- **Entrega de Tareas**:
  - Los estudiantes pueden subir archivos para entregar tareas.
  - Las tareas deben tener un estado (pendiente, entregada, calificada).
  
- **Calificaciones**:
  - Los profesores califican las tareas entregadas y asignan una nota.
  - Los estudiantes pueden consultar sus calificaciones.

### 5. Reportes
- **Generación de Reportes**:
  - El sistema debe generar reportes en formato PDF o Excel, incluyendo:
    - Asistencias por curso/estudiante.
    - Promedio de calificaciones.
    - Tareas entregadas por curso.
  - Los reportes son accesibles para el administrador y los profesores.

### 6. Notificaciones
- **Tipos de Notificaciones**:
  - Avisos sobre nuevas tareas.
  - Alertas de entrega próxima o atrasada.
  - Notificaciones sobre eventos como cambios de horarios o mensajes del administrador.
  
- **Entrega de Notificaciones**:
  - Los usuarios recibirán notificaciones en su panel principal.
  - Opcional: Envío de notificaciones por correo electrónico.

## Requisitos No Funcionales

### 1. Rendimiento
- El sistema debe soportar al menos 500 usuarios simultáneos.
- Las consultas deben ejecutarse en menos de 2 segundos.

### 2. Seguridad
- **Autenticación**: Manejo de sesiones seguras con JWT.
- **Autorización**: Control de acceso basado en roles.
- **Protección de Datos**: Cifrado de contraseñas y datos sensibles.
- **Prevención de Ataques**:
  - Protección contra inyecciones SQL.
  - Validación de entradas en el backend.

### 3. Escalabilidad
- Redis debe manejar sesiones y notificaciones para mejorar la velocidad.
- Arquitectura diseñada para permitir la expansión (por ejemplo, añadir funcionalidades futuras como chat entre usuarios).

### 4. Usabilidad
- Interfaz intuitiva para usuarios con conocimientos básicos de tecnología.
- Diseño responsive para acceso desde dispositivos móviles y computadoras.

## Requisitos Técnicos

### Frontend (React)
- **Tecnología**: React.
- **Librerías sugeridas**:
  - React Router: Para navegación de páginas.
  - Axios o Fetch: Para consumir la API REST.
  - Redux o Context API: Para manejar el estado global de la aplicación.
  - Material-UI o Tailwind CSS: Para diseñar componentes atractivos.
  - Recharts: Para gráficos en los reportes.

### Backend (Pyramid)
- **Tecnología**: Pyramid.
- **Autenticación**: Implementación de JWT para sesiones seguras.
- **Rutas RESTful**: Para todas las operaciones (usuarios, cursos, tareas, etc.).
- **Uso de Mako**: Para vistas específicas (como reportes PDF).

### Base de Datos (PostgreSQL)
- **Modelo relacional**: Maneja relaciones entre usuarios, cursos, asistencias, tareas y notificaciones.
- **Optimización de consultas**: Con índices para búsquedas frecuentes (como por curso o estudiante).

### ORM (SQLAlchemy)
- Manejo de modelos de datos como objetos Python.
- Migraciones de esquema con Alembic.

### Cache y Notificaciones (Redis)
- **Redis** manejará:
  - Almacenamiento de sesiones.
  - Colas para enviar notificaciones en tiempo real.

### Otros:
- **Servidor web**: Nginx para servir el frontend y backend.
- **Contenedores**: Docker para desplegar el sistema fácilmente.

## Casos de Uso (Flujo de Usuario)

### Estudiante:
1. Se registra en el sistema.
2. Se matricula en cursos disponibles.
3. Consulta sus calificaciones y tareas.
4. Recibe notificaciones.

### Profesor:
1. Registra asistencias.
2. Publica tareas.
3. Califica entregas.
4. Genera reportes de su curso.

### Administrador:
1. Gestiona usuarios, cursos y roles.
2. Genera reportes globales.
3. Envía notificaciones masivas.

## Arquitectura General
La arquitectura de la aplicación web se basa en una arquitectura multicapa (n-tier), donde cada componente cumple un rol específico y se comunica con las demás capas a través de interfaces bien definidas. Esto garantiza modularidad, escalabilidad y mantenimiento eficiente.

### Componentes Principales

1. **Capa de Presentación (Frontend)**:
   - **Tecnología**: React.
   - **Rol**: Renderizar la interfaz de usuario (UI) moderna, interactiva y responsiva.
   
2. **Capa de Lógica de Negocio (Backend)**:
   - **Tecnología**: Pyramid.
   - **Rol**: Procesar las solicitudes y devolver respuestas JSON a través de una API RESTful.

3. **Capa de Persistencia (Base de Datos)**:
   - **Tecnología**: PostgreSQL.
   - **Rol**: Almacenar y gestionar los datos transaccionales de la plataforma.

4. **Capa de Cache y Sesiones**:
   - **Tecnología**: Redis.
   - **Rol**: Mejorar el rendimiento con almacenamiento en memoria de datos temporales.

## Diseño del Sistema

### Diagrama de Clases
Las clases principales del sistema incluyen:
- Usuario
- Curso
- Matrícula
- Tarea
- Asistencia
- Notificación

### Diseño de Base de Datos
Tablas principales:
- **usuarios**: ID, nombre, rol, email, contraseña.
- **cursos**: ID, nombre, descripción, profesor_asignado.
- **matriculas**: ID, id_usuario, id_curso.
- **asistencias**: ID, id_usuario, id_curso, fecha, presente.
- **tareas**: ID, id_curso, título, descripción, fecha_entrega.
- **notificaciones**: ID, id_usuario, mensaje, fecha_envio.

## Tecnologías y Uso

### React
- Diseño de una interfaz dinámica.
- Consumo de la API del backend.

### Pyramid
- Gestión de autenticación y permisos.

### PostgreSQL
- Almacenamiento de todos los datos transaccionales.

### Redis
- Optimización de carga con sesiones y notificaciones.

### SQLAlchemy
- Manejo de la lógica de base de datos en Python.

## Diagrama de Arquitectura
1. **Frontend (React)**: Interfaz gráfica que se comunica con el backend.
2. **Backend (Pyramid)**: Lógica de negocio y validación de datos.
3. **Base de Datos (PostgreSQL)**: Almacenamiento persistente.
4. **Redis**: Cache y almacenamiento en memoria.

## Instalación

1. **Instalar dependencias**:
   - Backend: `pip install -r requirements.txt`
   - Frontend: `npm install`

2. **Base de datos**:
   - Crear la base de datos en PostgreSQL.
   - Ejecutar migraciones de Alembic.

3. **Despliegue**:
   - Usar Docker para contenedores.
   - Configurar Nginx para servir el sistema.

## Licencia
Este proyecto está bajo la licencia MIT.  

