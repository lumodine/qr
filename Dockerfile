FROM node:22.12.0-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "start"]
