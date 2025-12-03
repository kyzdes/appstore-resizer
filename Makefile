.PHONY: help install dev build preview docker-build docker-run docker-stop docker-logs docker-clean deploy-local deploy-prod clean

help: ## Показать это сообщение помощи
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	npm install

dev: ## Запустить dev-сервер
	npm run dev

build: ## Собрать production версию
	npm run build

preview: build ## Предпросмотр production сборки
	npm run preview

docker-build: ## Собрать Docker образ
	docker build -t appstore-resizer:latest .

docker-run: ## Запустить Docker контейнер
	docker-compose up -d

docker-stop: ## Остановить Docker контейнер
	docker-compose down

docker-logs: ## Показать логи Docker контейнера
	docker-compose logs -f

docker-restart: ## Перезапустить Docker контейнер
	docker-compose restart

docker-clean: ## Удалить Docker образ и контейнеры
	docker-compose down -v
	docker rmi appstore-resizer:latest || true

deploy-local: docker-build docker-run ## Развернуть локально с Docker

deploy-prod: ## Развернуть на production (требует настройки)
	docker-compose -f docker-compose.prod.yml up -d --build

update: ## Обновить приложение (git pull + rebuild)
	git pull
	docker-compose down
	docker-compose up -d --build

clean: ## Очистить build артефакты
	rm -rf build dist node_modules

status: ## Показать статус контейнеров
	docker-compose ps

stats: ## Показать статистику использования ресурсов
	docker stats appstore-resizer --no-stream
