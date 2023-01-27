FROM node:18-alpine

WORKDIR /server

COPY package.json .
RUN npm i --omit-dev

COPY . .
CMD [ "node", "index.js" ]