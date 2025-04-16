#!/bin/bash

# Create directories for certbot
mkdir -p ./certbot/www
mkdir -p ./ssl

# Stop any running containers
docker-compose -f docker-compose.prod.yml down

# Start nginx without SSL
docker-compose -f docker-compose.prod.yml up -d frontend

# Get SSL certificate
docker-compose -f docker-compose.prod.yml run --rm certbot

# Restart everything with SSL
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

echo "SSL certificates have been generated. Please check if everything is working correctly."
echo "Your site should now be accessible via HTTPS!" 