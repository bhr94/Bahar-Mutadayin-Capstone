FROM node:14.12.0

RUN mkdir /src

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]