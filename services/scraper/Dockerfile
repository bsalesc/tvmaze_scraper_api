FROM node:8-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 8081
CMD [ "npm", "run", "start" ]