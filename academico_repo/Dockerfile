# Usa una imagen base con Python 3.12
FROM python:3.12

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del backend al contenedor
COPY . .

# Instala las dependencias necesarias
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expone el puerto en el que corre Pyramid
EXPOSE 6543

# Comando para iniciar la aplicación
CMD ["pserve", "/app/development.ini", "--reload"]
