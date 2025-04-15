# Etapa 1: Build com TypeScript
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2: Imagem final com Puppeteer funcionando
FROM node:20

# Instala dependências para o Chromium (Puppeteer)
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
 && rm -rf /var/lib/apt/lists/*

# Diretório da aplicação
WORKDIR /app

# Copia arquivos do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/public ./dist/public
COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm install --omit=dev

# Configurações importantes para o Puppeteer funcionar no Docker
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Roda a aplicação
CMD ["node", "dist/app.js"]
