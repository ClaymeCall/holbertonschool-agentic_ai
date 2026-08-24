## Run the container

```sh
docker compose up --build
```

## Add data to the db

### Enter PGSQL CLI through the container
```sh
> docker exec -it 0-persist_data-db-1 psql -U postgres
```

### View contents and add a new entry
```sql

psql (16.15)
postgres=# SELECT * FROM items;

 id |    content    |         created_at
----+---------------+----------------------------
  1 | Sample item 1 | 2026-08-24 09:19:15.163456
  2 | Sample item 2 | 2026-08-24 09:19:15.164262
(2 rows)


postgres=# INSERT INTO items (content) VALUES ('I should persist');
INSERT 0 1

postgres=# SELECT * FROM items;
 id |     content      |         created_at
----+------------------+----------------------------
  1 | Sample item 1    | 2026-08-24 09:19:15.163456
  2 | Sample item 2    | 2026-08-24 09:19:15.164262
  3 | I should persist | 2026-08-24 09:38:27.658756
(3 rows)
```

## Delete the container
```sh
> docker compose down
[+] down 2/2
 ✔ Container 0-persist_data-db-1      Removed                    0.6s
 ✔ Network 0-persist_data_app_network Removed                    0.2s

> docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Deleted Containers:
d73969a6edcd8cef5feee08081e645935b2a0a90b4cde03f8b0657ee55a0f7d2

Total reclaimed space: 12.29kB

> docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```


## Recreate a container and check persistence
```sh
docker compose up --build -d
[+] Building 1.1s (11/11) FINISHED
...
[+] up 3/3
 ✔ Image 0-persist_data-db            Built                      1.2s
 ✔ Network 0-persist_data_app_network Created                    0.1s
 ✔ Container 0-persist_data-db-1      Started

> docker exec -it 0-persist_data-db-1 psql -U postgres
```

```sql
psql (16.15)
SELECT * FROM items
postgres-# ;
 id |     content      |         created_at
----+------------------+----------------------------
  1 | Sample item 1    | 2026-08-24 09:19:15.163456
  2 | Sample item 2    | 2026-08-24 09:19:15.164262
  3 | I should persist | 2026-08-24 09:38:27.658756
(3 rows)

```
