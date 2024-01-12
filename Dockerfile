# Single stage build
FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

LABEL maintainer="Zubs <zubairidrisaweda@gmail.com>"

CMD [ "node", "src/index.js" ]
