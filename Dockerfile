FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json .
RUN apk add --no-cache python3 make g++
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]
