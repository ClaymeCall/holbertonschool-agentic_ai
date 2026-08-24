## Run the stack

```sh
cd 1-networking/
docker compose up --build
```

## Test the network IP aliases
```sh
docker compose run --rm web ash
[+]  1/1t 1/11
 ✔ Container 1-networking-api-1 Running                  0.0s
Container 1-networking-web-run-6f21f28c96c6 Creating
Container 1-networking-web-run-6f21f28c96c6 Created
/ # curl api:5000
Hello from Flask in Docker!
```
