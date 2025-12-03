# ⚡ Быстрый старт

Это краткое руководство для быстрого развертывания на VPS.

## 🎯 За 5 минут

### Вариант 1: Автоматическая установка

```bash
# 1. Подключитесь к VPS
ssh root@your-server.com

# 2. Клонируйте репозиторий
cd /opt
git clone https://github.com/your-repo/appstore-resizer.git
cd appstore-resizer

# 3. Запустите скрипт установки
chmod +x deployment/setup.sh
sudo ./deployment/setup.sh

# 4. Запустите приложение
docker-compose up -d

# 5. Проверьте статус
docker-compose ps
```

**Готово!** Приложение доступно на `http://your-server-ip`

### Вариант 2: Ручная установка

```bash
# 1. Установите Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. Установите Docker Compose
sudo apt-get install -y docker-compose-plugin

# 3. Клонируйте и запустите
git clone https://github.com/your-repo/appstore-resizer.git
cd appstore-resizer
docker-compose up -d
```

## 🔒 Добавление HTTPS (опционально)

```bash
# 1. Установите nginx и certbot на хост
sudo apt-get install -y nginx certbot python3-certbot-nginx

# 2. Настройте nginx
sudo cp deployment/nginx-host.conf /etc/nginx/sites-available/appstore-resizer
sudo nano /etc/nginx/sites-available/appstore-resizer  # замените your-domain.com
sudo ln -s /etc/nginx/sites-available/appstore-resizer /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 3. Получите SSL сертификат
sudo certbot --nginx -d your-domain.com
```

**Готово!** Приложение доступно на `https://your-domain.com`

## 📊 Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Обновление
git pull && docker-compose up -d --build
```

## ❓ Проблемы?

См. полную документацию: [DEPLOYMENT.md](./DEPLOYMENT.md)
