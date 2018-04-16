FROM node:9.11.1

#add website to container
COPY website /app

#set working directory
WORKDIR /app

RUN npm install

ENTRYPOINT npm run start-dev
