# 🚀 Инструкция по развертыванию App Store Screenshot Converter

Это подробное руководство по развертыванию приложения на вашем VPS сервере с использованием Docker.

## 📋 Содержание

1. [Требования](#требования)
2. [Быстрый старт](#быстрый-старт)
3. [Локальная разработка](#локальная-разработка)
4. [Развертывание на VPS](#развертывание-на-vps)
5. [Настройка SSL (HTTPS)](#настройка-ssl-https)
6. [Управление приложением](#управление-приложением)
7. [Устранение неполадок](#устранение-неполадок)

---

## 🔧 Требования

### Для локальной разработки:
- Node.js 18+
- npm или yarn

### Для production на VPS:
- VPS с Ubuntu 20.04/22.04 (или Debian 10+)
- Минимум 1GB RAM, 1 CPU
- 10GB свободного места на диске
- Docker и Docker Compose
- Доменное имя (для HTTPS)
- SSH доступ к серверу

---

## ⚡ Быстрый старт

### Вариант 1: Локальный запуск без Docker

```bash
# 1. Установите зависимости
npm install

# 2. Запустите dev-сервер
npm run dev

# Приложение будет доступно на http://localhost:3000
```

### Вариант 2: Локальный запуск с Docker

```bash
# 1. Соберите Docker образ
docker build -t appstore-resizer .

# 2. Запустите контейнер
docker run -p 8080:80 appstore-resizer

# Приложение будет доступно на http://localhost:8080
```

### Вариант 3: Docker Compose

```bash
# Запустите все одной командой
docker-compose up -d

# Приложение будет доступно на http://localhost
```

---

## 💻 Локальная разработка

### Установка зависимостей

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

Сервер запустится на `http://localhost:3000` с hot-reload.

### Сборка production версии

```bash
npm run build
```

Результат будет в папке `build/`.

### Предпросмотр production сборки

```bash
npm run preview
```

---

## 🌐 Развертывание на VPS

### Шаг 1: Подготовка VPS

Подключитесь к серверу по SSH:

```bash
ssh root@ваш-сервер.com
```

### Шаг 2: Автоматическая установка зависимостей

Загрузите и запустите скрипт установки:

```bash
# Скачайте скрипт
wget https://raw.githubusercontent.com/ваш-репозиторий/deployment/setup.sh

# Сделайте его исполняемым
chmod +x setup.sh

# Запустите установку
sudo ./setup.sh
```

Скрипт установит:
- Docker и Docker Compose
- Nginx
- Certbot (для SSL сертификатов)

### Шаг 3: Ручная установка (альтернатива скрипту)

<details>
<summary>Развернуть инструкцию по ручной установке</summary>

#### Обновление системы
```bash
sudo apt-get update
sudo apt-get upgrade -y
```

#### Установка Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl enable docker
sudo systemctl start docker
```

#### Установка Docker Compose
```bash
sudo apt-get install -y docker-compose-plugin
```

#### Установка Nginx
```bash
sudo apt-get install -y nginx
```

#### Установка Certbot
```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

</details>

### Шаг 4: Клонирование проекта

```bash
# Перейдите в директорию для проектов
cd /opt

# Клонируйте репозиторий (замените на ваш URL)
git clone https://github.com/ваш-репозиторий/appstore-resizer.git

# Перейдите в директорию проекта
cd appstore-resizer
```

### Шаг 5: Запуск приложения

#### Вариант A: Простое развертывание (HTTP, без домена)

```bash
# Запустите контейнер на порту 80
docker-compose up -d

# Проверьте статус
docker-compose ps
```

Приложение будет доступно по IP адресу: `http://ваш-ip-адрес`

#### Вариант B: Production развертывание (HTTPS с доменом)

1. **Настройте переменные окружения**

```bash
# Отредактируйте docker-compose.prod.yml
nano docker-compose.prod.yml
```

Замените `your-domain.com` на ваш домен.

2. **Запустите контейнер на внутреннем порту**

```bash
# Используйте production конфигурацию
docker-compose -f docker-compose.prod.yml up -d
```

По умолчанию контейнер будет доступен на `localhost:8080`.

---

## 🔒 Настройка SSL (HTTPS)

### Предварительные требования

1. Доменное имя указывает на IP вашего VPS (A-запись в DNS)
2. Порты 80 и 443 открыты в firewall

### Шаг 1: Настройка Nginx на хосте

```bash
# Скопируйте конфигурацию nginx
sudo cp deployment/nginx-host.conf /etc/nginx/sites-available/appstore-resizer

# Замените your-domain.com на ваш домен
sudo nano /etc/nginx/sites-available/appstore-resizer

# Создайте символическую ссылку
sudo ln -s /etc/nginx/sites-available/appstore-resizer /etc/nginx/sites-enabled/

# Удалите дефолтную конфигурацию
sudo rm /etc/nginx/sites-enabled/default

# Проверьте конфигурацию
sudo nginx -t

# Перезапустите nginx
sudo systemctl restart nginx
```

### Шаг 2: Получение SSL сертификата

```bash
# Получите сертификат от Let's Encrypt
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Следуйте инструкциям на экране
```

Certbot автоматически:
- Получит SSL сертификат
- Настроит nginx для HTTPS
- Настроит автоматическое обновление сертификата

### Шаг 3: Проверка автообновления

```bash
# Проверьте, что автообновление работает
sudo certbot renew --dry-run
```

Теперь ваше приложение доступно по адресу: `https://your-domain.com`

---

## 📊 Управление приложением

### Просмотр логов

```bash
# Логи контейнера
docker-compose logs -f

# Логи nginx
sudo tail -f /var/log/nginx/appstore-resizer-access.log
sudo tail -f /var/log/nginx/appstore-resizer-error.log
```

### Остановка приложения

```bash
docker-compose down
```

### Перезапуск приложения

```bash
docker-compose restart
```

### Обновление приложения

```bash
# Получите последние изменения
git pull

# Пересоберите и перезапустите
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Удаление всего (очистка)

```bash
# Остановите и удалите контейнеры
docker-compose down

# Удалите образ
docker rmi appstore-resizer

# Удалите неиспользуемые образы и кэш
docker system prune -a
```

---

## 🐛 Устранение неполадок

### Проблема: Контейнер не запускается

**Решение:**
```bash
# Проверьте логи
docker-compose logs

# Проверьте статус
docker-compose ps

# Пересоберите образ
docker-compose build --no-cache
docker-compose up -d
```

### Проблема: Порт уже занят

**Решение:**
```bash
# Проверьте, что использует порт 80
sudo lsof -i :80

# Остановите конфликтующий процесс или измените порт в docker-compose.yml
```

### Проблема: Nginx не работает

**Решение:**
```bash
# Проверьте статус
sudo systemctl status nginx

# Проверьте конфигурацию
sudo nginx -t

# Перезапустите
sudo systemctl restart nginx

# Проверьте логи
sudo tail -f /var/log/nginx/error.log
```

### Проблема: SSL сертификат не получается

**Решение:**
```bash
# Убедитесь, что домен указывает на ваш IP
dig your-domain.com

# Проверьте, открыты ли порты 80 и 443
sudo ufw status

# Откройте порты если нужно
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Попробуйте получить сертификат снова
sudo certbot --nginx -d your-domain.com
```

### Проблема: Приложение работает медленно

**Решение:**
```bash
# Проверьте ресурсы сервера
htop

# Проверьте использование Docker
docker stats

# Очистите неиспользуемые образы
docker system prune -a
```

---

## 🔄 Обновление версий

### Обновление Docker образа

```bash
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Обновление зависимостей

```bash
# Локально
npm update
npm run build

# Пересоберите Docker образ
docker-compose build --no-cache
docker-compose up -d
```

---

## 📈 Мониторинг

### Проверка здоровья контейнера

```bash
docker inspect appstore-resizer | grep -A 10 Health
```

### Статистика использования ресурсов

```bash
docker stats appstore-resizer
```

---

## 🔐 Безопасность

### Рекомендации:

1. **Настройте firewall:**
```bash
sudo ufw enable
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
```

2. **Отключите вход root по SSH:**
```bash
sudo nano /etc/ssh/sshd_config
# Установите: PermitRootLogin no
sudo systemctl restart sshd
```

3. **Регулярно обновляйте систему:**
```bash
sudo apt-get update && sudo apt-get upgrade -y
```

4. **Настройте автоматические обновления безопасности:**
```bash
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте раздел [Устранение неполадок](#устранение-неполадок)
2. Просмотрите логи: `docker-compose logs` и `sudo journalctl -u nginx`
3. Создайте issue в репозитории проекта

---

## 📝 Дополнительные ресурсы

- [Docker документация](https://docs.docker.com/)
- [Nginx документация](https://nginx.org/ru/docs/)
- [Let's Encrypt документация](https://letsencrypt.org/docs/)
- [Digital Ocean tutorials](https://www.digitalocean.com/community/tutorials)

---

**Автор:** App Store Screenshot Converter Team
**Версия:** 1.0.0
**Дата:** Декабрь 2025
