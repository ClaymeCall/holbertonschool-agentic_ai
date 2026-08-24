FROM node:20-alpine

WORKDIR /app

RUN adduser -D nonroot && chown nonroot:nonroot . -R

USER nonroot

COPY package.json .

RUN npm install

COPY index.js .

CMD ["node", "index.js"]
