FROM node:20-alpine

WORKDIR /usr/src/app

RUN addgroup app \
    adduser -S -G app app \
    chown app:app /usr/src/app
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm install

COPY . .

HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://127.0.0.1:3000/health || exit 1

EXPOSE 3000

CMD ["node", "server.js"]
