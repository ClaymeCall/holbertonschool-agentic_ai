# Dockerized Svelte App

This project is a Dockerized Svelte application.

## Build and Run with Docker

### Build the Docker image
```sh
 docker build -t svelte-app .
```

### Run the container
```sh
 docker run -p 4173:4173 svelte-app
```

### Verify the app
```sh
curl http://localhost:4173
```

The app should return HTML content with a "Svelte" welcome page.
