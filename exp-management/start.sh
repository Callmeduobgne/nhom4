#!/bin/bash

echo "🐳 Starting EXP Management System with Docker..."

docker-compose down
docker-compose build
docker-compose up -d

echo "✅ Application is starting..."
echo "🌐 Frontend: http://localhost:3333"
echo "⚡ Backend API: http://localhost:8000/api"
echo "🗄️ Database: PostgreSQL on port 5432"

echo "📊 Checking services status..."
sleep 10
docker-compose ps
