FROM node:13.8.0-alpine

WORKDIR /usr/src/

COPY package.json .
COPY ./src .

RUN npm install

CMD [ "npm", "start"]