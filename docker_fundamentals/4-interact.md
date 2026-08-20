## Pass env vars at runtime
`docker run --name task4-container -e MESSAGE="<insert message>" -p 3000:3000 task1-image`

```
docker inspect task4-container
[
    {
        ...
        "Config": {
            "Hostname": "2f5f8d488e35",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": true,
            "AttachStderr": true,
            "ExposedPorts": {
                "3000/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "MESSAGE=This is a message",
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NODE_VERSION=26.7.0"
            ],
            "Cmd": [
                "npm",
                "start"
            ],
            "Image": "task1-image",
            "Volumes": null,
            "WorkingDir": "/app",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "Labels": {}
        },
        ...
    }
]
```

```bash
docker exec task4-container printenv MESSAGE
This is a message
```

```bash
docker logs task4-container

> node-app@1.0.0 start
> node app.js

Server running on http://localhost:3000
```
