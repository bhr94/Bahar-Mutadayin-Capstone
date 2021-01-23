FROM node:latest

RUN mkdir /server

WORKDIR /server

COPY  package.json .

RUN npm install

ENV PORT 8080

COPY . .

CMD ["node", "server.js"]