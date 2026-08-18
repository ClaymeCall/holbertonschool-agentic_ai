## Commands I used

### Run the container

```bash
docker run -p 8080:80 nginx
```
Run nginx docker image and expose to host port 8080

Output :
```bash
docker run -p 8080:80 nginx
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configur
ation
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.co
nf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.
conf
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2026/08/18 20:33:55 [notice] 1#1: using the "epoll" event method
2026/08/18 20:33:55 [notice] 1#1: nginx/1.31.3
2026/08/18 20:33:55 [notice] 1#1: built by gcc 14.2.0 (Debian 14.2.0-19)
2026/08/18 20:33:55 [notice] 1#1: OS: Linux 6.18.44
2026/08/18 20:33:55 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 99999:99999
2026/08/18 20:33:55 [notice] 1#1: start worker processes
2026/08/18 20:33:55 [notice] 1#1: start worker process 29
2026/08/18 20:33:55 [notice] 1#1: start worker process 30
2026/08/18 20:33:55 [notice] 1#1: start worker process 31
2026/08/18 20:33:55 [notice] 1#1: start worker process 32
2026/08/18 20:33:55 [notice] 1#1: start worker process 33
2026/08/18 20:33:55 [notice] 1#1: start worker process 34
2026/08/18 20:33:55 [notice] 1#1: start worker process 35
2026/08/18 20:33:55 [notice] 1#1: start worker process 36
2026/08/18 20:33:55 [notice] 1#1: start worker process 37
2026/08/18 20:33:55 [notice] 1#1: start worker process 38
2026/08/18 20:33:55 [notice] 1#1: start worker process 39
2026/08/18 20:33:55 [notice] 1#1: start worker process 40
2026/08/18 20:33:55 [notice] 1#1: start worker process 41
2026/08/18 20:33:55 [notice] 1#1: start worker process 42
2026/08/18 20:33:55 [notice] 1#1: start worker process 43
2026/08/18 20:33:55 [notice] 1#1: start worker process 44
172.17.0.1 - - [18/Aug/2026:20:34:09 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.21.0" "-"
```

### Check docker status
```bash
docker ps -a
```

Output:
```bash
 docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS
 PORTS                                     NAMES
068b2c3c192b   nginx                "/docker-entrypoint.…"   4 minutes ago   Up 4 minutes
 0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   stoic_booth
e534f504c1a5   postgres:18-alpine   "docker-entrypoint.s…"   6 weeks ago     Up 37 hours
 127.0.0.1:5432->5432/tcp                  saracroche-postgres
```

### Make a request to nginx
```bash
curl http://localhost:8080
```

Output:
```bash
 curl http://localhost:8080
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, nginx is successfully installed and working.
Further configuration is required for the web server, reverse proxy,
API gateway, load balancer, content cache, or other features.</p>

<p>For online documentation and support please refer to
<a href="https://nginx.org/">nginx.org</a>.<br/>
To engage with the community please visit
<a href="https://community.nginx.org/">community.nginx.org</a>.<br/>
For enterprise grade support, professional services, additional
security features and capabilities please refer to
<a href="https://f5.com/nginx">f5.com/nginx</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

### Enter a shell in the container
```bash
docker exec -it dc5f9065a791 sh

```
```bash
tail -5 /var/log/nginx/access.log

172.17.0.1 - - [18/Aug/2026:21:12:46 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.21.0" "-"
172.17.0.1 - - [18/Aug/2026:21:17:11 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.21.0" "-"

```

### Check docker logs

```bash
docker logs stupefied_kepler

2026/08/18 20:59:12 [notice] 1#1: using the "epoll" event method
2026/08/18 20:59:12 [notice] 1#1: nginx/1.31.3
2026/08/18 20:59:12 [notice] 1#1: built by gcc 14.2.0 (Debian 14.2.0-19)
2026/08/18 20:59:12 [notice] 1#1: OS: Linux 6.18.44
2026/08/18 20:59:12 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 99999:99999
2026/08/18 20:59:12 [notice] 1#1: start worker processes
2026/08/18 20:59:12 [notice] 1#1: start worker process 29
2026/08/18 20:59:12 [notice] 1#1: start worker process 30
2026/08/18 20:59:12 [notice] 1#1: start worker process 31
2026/08/18 20:59:12 [notice] 1#1: start worker process 32
2026/08/18 20:59:12 [notice] 1#1: start worker process 33
2026/08/18 20:59:12 [notice] 1#1: start worker process 34
2026/08/18 20:59:12 [notice] 1#1: start worker process 35
2026/08/18 20:59:12 [notice] 1#1: start worker process 36
2026/08/18 20:59:12 [notice] 1#1: start worker process 37
2026/08/18 20:59:12 [notice] 1#1: start worker process 38
2026/08/18 20:59:12 [notice] 1#1: start worker process 39
2026/08/18 20:59:12 [notice] 1#1: start worker process 40
2026/08/18 20:59:12 [notice] 1#1: start worker process 41
2026/08/18 20:59:12 [notice] 1#1: start worker process 42
2026/08/18 20:59:12 [notice] 1#1: start worker process 43
2026/08/18 20:59:12 [notice] 1#1: start worker process 44
172.17.0.1 - - [18/Aug/2026:21:12:46 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.21.0" "-"
172.17.0.1 - - [18/Aug/2026:21:17:11 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.21.0" "-"
```


### Stop and remove the container

```bash
docker stop stupefied_kepler
docker rm stupefied_kepler
```

## 3 Observations
- `docker run` auto-pulls an image I don't already have on my system.
- `docker stop` gracefully shuts down the container, `docker kill` just kills the process. Both doesn't delete the container.
- Docker automatically generates a slug for containers if a name wasn't specified.
