#!/bin/bash

cd $(dirname $BASH_SOURCE[0])

rsync -rav ./proxy/ mechdb:/app/proxy/
docker-compose run web yarn build
rsync -rav --exclude node_modules ./api/ mechdb:/app/api/
rsync -rav --exclude node_modules ./web/ mechdb:/app/web/
rsync docker-compose.production.yml mechdb:/app/docker-compose.yml

ssh mechdb "cd /app && docker-compose up -d && docker-compose restart api web"
