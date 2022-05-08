FROM node:14.17.5
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production

RUN npm run build
