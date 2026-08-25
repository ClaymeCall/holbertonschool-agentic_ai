FROM golang:1.22-alpine AS builder

WORKDIR /src
COPY . .
RUN go build -o /app/server .


FROM alpine:3.20

COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
