# Docker optimization challenge
## Optimization summary
|            | Before | After | After + Cache |
|------------|--------|-------|---------------|
| Build time | 19.05s | 7.6s  | 1.1s          |
| Size       | 1.59GB | 208MB | 208MB         |


- ~60% Initial build time improvement (~94% with cache)
- ~86% Image size reduction

## Changes made

## Method used

### Measure build times
```sh
> time docker build -t 2-optimize-image .
```

### Measure image size
```sh
> docker image list
```

### Clean all docker related files

```sh
docker system prune -af
docker image prune -af
```

### Measure after optimizations

### Build time

```sh
time docker build -t 2-optimize-image .
[+] Building 7.5s (11/11) FINISHED                                                                                                  docker:default
 => [internal] load build definition from Dockerfile                                                                                          0.0s
 => => transferring dockerfile: 222B                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/node:20-alpine                                                                             1.0s
 => [internal] load .dockerignore                                                                                                             0.0s
 => => transferring context: 65B                                                                                                              0.0s
 => [1/6] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293                       2.5s
 => => resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293                       0.0s
 => => sha256:fff4e2c1b189bf87d63ad8bd07f7f4eb288d6f2b6a07a8bb44c60e8c075d2096 445B / 445B                                                    0.1s
 => => sha256:b2cbbfe903b0821005780971ddc5892edcc4ce74c5a48d82e1d2b382edac3122 1.26MB / 1.26MB                                                0.3s
 => => sha256:4feea04c154301db6f4a496efa397b3db96603b1c009c797cfdde77bea8b3287 43.23MB / 43.23MB                                              1.3s
 => => sha256:6a0ac1617861a677b045b7ff88545213ec31c0ff08763195a70a4a5adda577bb 3.86MB / 3.86MB                                                0.4s
 => => extracting sha256:6a0ac1617861a677b045b7ff88545213ec31c0ff08763195a70a4a5adda577bb                                                     0.1s
 => => extracting sha256:4feea04c154301db6f4a496efa397b3db96603b1c009c797cfdde77bea8b3287                                                     1.1s
 => => extracting sha256:b2cbbfe903b0821005780971ddc5892edcc4ce74c5a48d82e1d2b382edac3122                                                     0.1s
 => => extracting sha256:fff4e2c1b189bf87d63ad8bd07f7f4eb288d6f2b6a07a8bb44c60e8c075d2096                                                     0.0s
 => [internal] load build context                                                                                                             0.0s
 => => transferring context: 460B                                                                                                             0.0s
 => [2/6] WORKDIR /app                                                                                                                        0.0s
 => [3/6] RUN adduser -D nonroot && chown nonroot:nonroot . -R                                                                                0.5s
 => [4/6] COPY package.json .                                                                                                                 0.1s
 => [5/6] RUN npm install                                                                                                                     2.5s
 => [6/6] COPY index.js .                                                                                                                     0.1s
 => exporting to image                                                                                                                        0.7s
 => => exporting layers                                                                                                                       0.3s
 => => exporting manifest sha256:0e91cf5679364046b44cdda7564022622e2ccbed291ba251b862a82184b49b58                                             0.0s
 => => exporting config sha256:676b8d32a44e91c5604370f2e58c5c76a047abbb72c5a51443d4f2c00c86e756                                               0.0s
 => => exporting attestation manifest sha256:001a1992cac7db6c4cf57322201ca31e269cc9443e9c431bf5ad3206eb766a50                                 0.0s
 => => exporting manifest list sha256:522d36b54d8dabce0d5d0319cc5a7a9dddfd15bccd439a05f146491c0c74115f                                        0.0s
 => => naming to docker.io/library/2-optimize-image:latest                                                                                    0.0s
 => => unpacking to docker.io/library/2-optimize-image:latest                                                                                 0.4s
docker build -t 2-optimize-image .  0,11s user 0,08s system 2% cpu 7,614 total
```

Again for cached build time
```sh
time docker build -t 2-optimize-image .
[+] Building 1.0s (11/11) FINISHED                                                                                                  docker:default
 => [internal] load build definition from Dockerfile                                                                                          0.0s
 => => transferring dockerfile: 222B                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/node:20-alpine                                                                             0.9s
 => [internal] load .dockerignore                                                                                                             0.0s
 => => transferring context: 65B                                                                                                              0.0s
 => [1/6] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293                       0.0s
 => => resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293                       0.0s
 => [internal] load build context                                                                                                             0.0s
 => => transferring context: 62B                                                                                                              0.0s
 => CACHED [2/6] WORKDIR /app                                                                                                                 0.0s
 => CACHED [3/6] RUN adduser -D nonroot && chown nonroot:nonroot . -R                                                                         0.0s
 => CACHED [4/6] COPY package.json .                                                                                                          0.0s
 => CACHED [5/6] RUN npm install                                                                                                              0.0s
 => CACHED [6/6] COPY index.js .                                                                                                              0.0s
 => exporting to image                                                                                                                        0.0s
 => => exporting layers                                                                                                                       0.0s
 => => exporting manifest sha256:0e91cf5679364046b44cdda7564022622e2ccbed291ba251b862a82184b49b58                                             0.0s
 => => exporting config sha256:676b8d32a44e91c5604370f2e58c5c76a047abbb72c5a51443d4f2c00c86e756                                               0.0s
 => => exporting attestation manifest sha256:35e2c166347926215231c2ff48398ff1e7ee10c66393db03ce259c8ba2695297                                 0.0s
 => => exporting manifest list sha256:f2125829c85dd384d7b1cb7725fa4356b312fdfd817d1453dad47601f1425be7                                        0.0s
 => => naming to docker.io/library/2-optimize-image:latest                                                                                    0.0s
 => => unpacking to docker.io/library/2-optimize-image:latest                                                                                 0.0s
docker build -t 2-optimize-image .  0,11s user 0,07s system 16% cpu 1,122 total
```

### Size

```sh
docker image list
                                                                       i Info →   U  In Use
IMAGE                     ID             DISK USAGE   CONTENT SIZE   EXTRA
2-optimize-image:latest   522d36b54d8d        208MB         50.8MB
```
