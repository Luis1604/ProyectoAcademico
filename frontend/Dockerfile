# Usa una imagen base con Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del frontend
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que corre React
EXPOSE 3000

# Comando para iniciar el frontend
CMD ["npm", "start"]
