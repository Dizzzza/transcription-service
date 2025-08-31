# Используем slim, а не alpine (чтобы избежать проблем с rollup)
FROM node:24-slim AS builder

WORKDIR /app

# Сначала копируем только package.json + lockfile, чтобы кешировалась установка зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходники
COPY . .

# Собираем фронт
RUN npm run build

# ---------------------------
# Production stage
FROM node:24-slim AS runner

WORKDIR /app

# Копируем только собранный build + package.json (без dev-зависимостей)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Устанавливаем только production-зависимости (vite-preview будет работать)
RUN npm ci

EXPOSE 3000

# Запуск preview-сервера
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
