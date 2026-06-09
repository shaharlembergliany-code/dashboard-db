FROM node:18-alpine

WORKDIR /app

COPY server.js .
COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
