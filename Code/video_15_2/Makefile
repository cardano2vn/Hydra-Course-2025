.PHONY: help docker-up docker-down docker-build docker-logs docker-shell db-shell db-migrate db-push db-studio db-reset clean restart rebuild

help:
	@echo "TipJar Docker Commands"
	@echo "====================="
	@echo ""
	@echo "Setup & Running:"
	@echo "  make docker-up         - Start all containers"
	@echo "  make docker-down       - Stop all containers"
	@echo "  make docker-build      - Build images"
	@echo "  make rebuild           - Rebuild without cache"
	@echo "  make restart           - Restart all containers"
	@echo ""
	@echo "Database:"
	@echo "  make db-migrate        - Run Prisma migrations"
	@echo "  make db-push           - Push schema to database"
	@echo "  make db-studio         - Open Prisma Studio"
	@echo "  make db-reset          - Reset database (⚠️ deletes data)"
	@echo ""
	@echo "Debugging:"
	@echo "  make docker-logs       - View app logs"
	@echo "  make docker-shell      - Enter app container shell"
	@echo "  make db-shell          - Enter database shell"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean             - Remove containers and volumes"
	@echo "  make prune             - Deep cleanup of Docker resources"

# Docker Compose Commands
docker-up:
	@echo "🚀 Starting containers..."
	docker-compose up -d
	@echo "✅ Containers started"
	@echo "📍 App: http://localhost:3000"
	@echo "📍 DB: localhost:5432"

docker-down:
	@echo "🛑 Stopping containers..."
	docker-compose down
	@echo "✅ Containers stopped"

docker-build:
	@echo "🔨 Building Docker images..."
	docker-compose build
	@echo "✅ Build complete"

rebuild:
	@echo "🔨 Rebuilding without cache..."
	docker-compose build --no-cache
	@echo "✅ Rebuild complete"

docker-logs:
	docker-compose logs -f app

docker-logs-db:
	docker-compose logs -f db

docker-shell:
	docker-compose exec app sh

db-shell:
	docker-compose exec db psql -U neondb_owner -d neondb

# Database Commands
db-migrate:
	@echo "📦 Running Prisma migrations..."
	docker-compose exec app bunx prisma migrate deploy
	@echo "✅ Migrations complete"

db-push:
	@echo "📤 Pushing schema to database..."
	docker-compose exec app bunx prisma db push
	@echo "✅ Schema pushed"

db-studio:
	@echo "🎨 Opening Prisma Studio..."
	docker-compose exec app bunx prisma studio

db-reset:
	@echo "⚠️  Resetting database (this will DELETE all data)..."
	@read -p "Are you sure? (yes/no) " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		docker-compose exec app bunx prisma migrate reset --force; \
		echo "✅ Database reset"; \
	else \
		echo "❌ Cancelled"; \
	fi

# Container Management
restart:
	@echo "🔄 Restarting containers..."
	docker-compose restart
	@echo "✅ Containers restarted"

restart-app:
	@echo "🔄 Restarting app..."
	docker-compose restart app
	@echo "✅ App restarted"

restart-db:
	@echo "🔄 Restarting database..."
	docker-compose restart db
	@echo "✅ Database restarted"

# Status
status:
	@echo "📊 Container Status:"
	@docker-compose ps
	@echo ""
	@echo "🖥️  Docker System:"
	@docker system df

# Cleanup
clean:
	@echo "🧹 Removing containers and volumes..."
	docker-compose down -v
	@echo "✅ Cleanup complete"

prune:
	@echo "🧹 Deep cleanup of Docker resources..."
	docker system prune -a --volumes
	@echo "✅ Docker system cleaned"

# Development
install:
	@echo "📦 Installing dependencies..."
	docker-compose exec app bun install
	@echo "✅ Dependencies installed"

lint:
	@echo "✨ Running linter..."
	docker-compose exec app bun run lint
	@echo "✅ Linter complete"

test:
	@echo "🧪 Running tests..."
	docker-compose exec app bun run test
	@echo "✅ Tests complete"

build-next:
	@echo "🏗️  Building Next.js..."
	docker-compose exec app bun run build
	@echo "✅ Build complete"

# Environment
setup-env:
	@echo "📝 Setting up environment..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✅ .env created from .env.example"; \
		echo "⚠️  Please update .env with your values"; \
	else \
		echo "ℹ️  .env already exists"; \
	fi

# Quick start
start: setup-env docker-up
	@echo "✅ TipJar is running!"
	@echo ""
	@echo "Next steps:"
	@echo "  - Visit http://localhost:3000"
	@echo "  - View logs: make docker-logs"
	@echo "  - Prisma Studio: make db-studio"
