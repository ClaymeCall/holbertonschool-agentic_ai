FROM node:20-alpine

WORKDIR /usr/src/app

RUN addgroup app && adduser -S -G app app
RUN chown app:app /usr/src/app
USER app

COPY package*.json ./
RUN npm install

COPY . .

HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "server.js"]
