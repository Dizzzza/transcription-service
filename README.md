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
