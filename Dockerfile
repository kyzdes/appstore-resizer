# Этап 1: Сборка приложения
FROM node:22-alpine AS builder
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код и собираем production build
COPY . .
RUN npm run build

# Этап 2: Production nginx сервер
FROM nginx:1.27-alpine

# Копируем собранное приложение из builder
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем кастомную nginx конфигурацию для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Удаляем дефолтную конфигурацию nginx
RUN rm -f /etc/nginx/conf.d/default.conf.default

EXPOSE 80

# Healthcheck для проверки работоспособности
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
