# Dockerized Node.js App

This project is a tiny Dockerized Node.js web app.

## Build and Run with Docker

### Build the Docker image
```sh
 docker build -t node-app .
```

### Run the container
```sh
 docker run -p 3000:3000 node-app
```

### Verify the app
```sh
curl http://localhost:3000
```

The app should return:
```
Hello from Node.js!
```
