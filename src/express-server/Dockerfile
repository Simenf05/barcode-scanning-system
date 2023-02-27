FROM node:18-alpine

WORKDIR /server

COPY package.json .
COPY package-lock.json .
RUN npm i --omit-dev

COPY . .
CMD exec node index.js