FROM node:13.8.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=PROD

RUN mkdir /usr/src/files

COPY package.json .
COPY ./src .

RUN npm install

CMD [ "npm", "start"]