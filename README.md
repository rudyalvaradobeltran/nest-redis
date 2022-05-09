# NEST-REDIS

## Initialize Redis container
docker pull redis
docker run --name nest-redis -p 5003:6379 -d redis
docker start nest-redis