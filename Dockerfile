# Imagen base de Node.js
FROM node:20-slim

# Variables para evitar logs innecesarios
ENV NODE_ENV=development

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (mejor para caché)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 5003

# Comando para iniciar el microservicio en modo desarrollo (opcional: cambia a npm start en producción)
CMD ["npm", "run", "dev"]