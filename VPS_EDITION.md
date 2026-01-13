# VPS_EDITION

## Текущее состояние на VPS
- Caddy: `/root/Caddyfile` проксирует `appstore.moone.dev` на `172.17.0.1:3020`.
- Контейнеры:
  - `appstore-converter` (image `appstore-converter:latest`) публикует `3020->80`.
  - `appstore-resizer` (image `appstore-resizer:0.3`) запущен без проброса порта.
- Персистентных томов нет.

## Заметки по пересборке
- Сборка образа: `docker build -t appstore-resizer:0.3 .`
- Запуск с публикацией порта: `docker run -d --name appstore-resizer -p 3020:80 appstore-resizer:0.3`
- Если меняется порт/домен, правки в `/root/Caddyfile`.
