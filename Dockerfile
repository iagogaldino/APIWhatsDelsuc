# Etapa de build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa final com Chromium já incluído
FROM ghcr.io/puppeteer/puppeteer:latest

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/public ./dist/public
COPY package*.json ./
RUN npm install --omit=dev

EXPOSE 5500

CMD ["node", "dist/app.js"]
