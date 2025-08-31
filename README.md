# 🎙️ Audio Transcription Service

Веб-приложение для загрузки аудиофайлов, хранения их в S3 (MinIO) и получения текстовой расшифровки.  
Проект построен на **Vite + React + TypeScript** для фронтенда и **Node.js + GraphQL** для бэкенда.  
Файлы сохраняются в MinIO, управление доступом осуществляется через presigned URL, а статус обработки можно отследить через GraphQL API.

## 🛠 Установка и настройка

### 1. Клонирование репозитория

git clone https://github.com/Dizzzza/transcription-service.git

### 2. Настройка переменных окружения

Скопируйте файл примера `.env.example` и создайте на его основе свой `.env`.

### 3. Запуск сервиса

docker-compose up

### 🔧 Переменные окружения

### MinIO Configuration

MINIO_ROOT_REGION — регион хранилища (рекомендуется us-east-1).

MINIO_ROOT_USER — имя пользователя администратора MinIO.

MINIO_ROOT_PASSWORD — пароль администратора MinIO.

MINIO_BUCKET — имя bucket’а для хранения аудиофайлов.

MINIO_ENDPOINT — URL для доступа к MinIO (например, http://localhost:9000).

### Backend Configuration

BACK_PORT — порт, на котором запускается бэкенд (GraphQL сервер).

### Frontend Configuration

FRONT_PORT — порт, на котором запускается фронтенд (Vite).

VITE_API_URL — URL для подключения фронтенда к GraphQL API (обычно http://localhost:<BACK_PORT>/graphql).
