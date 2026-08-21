## How to run
```sh
docker compose up # --build for the first time
```

## How to stop
```sh
docker compose down
```

## Healthcheck demonstrations
```yaml
...
  db:
    build: ./db
    env_file: ./db/.env
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - app_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s
...
```
⬇️

```sh
db-1  | 2026-08-21 10:03:51.447 UTC [1] LOG:  database system is ready to accept connections
Container 1-healthchecks-db-1 Healthy
```
