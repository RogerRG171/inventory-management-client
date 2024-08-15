FROM node:22.6.0-alpine3.20 as base

WORKDIR /usr/app

COPY . .

EXPOSE 3000

CMD ["npm","run", "dev"]