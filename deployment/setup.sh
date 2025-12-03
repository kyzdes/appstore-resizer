#!/bin/bash
# Скрипт для автоматической настройки на VPS

set -e

echo "==================================="
echo "App Store Screenshot Converter"
echo "Скрипт установки на VPS"
echo "==================================="

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
    echo "Пожалуйста, запустите скрипт с правами root (sudo)"
    exit 1
fi

# Обновление системы
echo "Обновление системы..."
apt-get update
apt-get upgrade -y

# Установка Docker
if ! command -v docker &> /dev/null; then
    echo "Установка Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
else
    echo "Docker уже установлен"
fi

# Установка Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Установка Docker Compose..."
    apt-get install -y docker-compose-plugin
else
    echo "Docker Compose уже установлен"
fi

# Установка nginx
if ! command -v nginx &> /dev/null; then
    echo "Установка Nginx..."
    apt-get install -y nginx
else
    echo "Nginx уже установлен"
fi

# Установка certbot для SSL
if ! command -v certbot &> /dev/null; then
    echo "Установка Certbot для SSL..."
    apt-get install -y certbot python3-certbot-nginx
else
    echo "Certbot уже установлен"
fi

echo ""
echo "==================================="
echo "Установка завершена!"
echo "==================================="
echo ""
echo "Следующие шаги:"
echo "1. Склонируйте репозиторий или загрузите файлы проекта"
echo "2. Запустите: docker-compose up -d"
echo "3. Настройте домен и SSL с помощью certbot"
echo ""
