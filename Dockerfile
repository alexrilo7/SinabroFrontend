# Usa una imagen de Node.js para construir la app
FROM node:16 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de Angular
RUN npm install

# Copia el resto del código fuente de Angular
COPY . .

# Construye la aplicación en modo producción
RUN npm run build --prod

# Usa una imagen de Nginx para servir la app
FROM nginx:alpine

# Copia los archivos de la build al directorio de Nginx
COPY --from=build /app/dist/your-angular-project-name /usr/share/nginx/html

# Expone el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
