# Etapa base
FROM node:20

# Evita prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# Copia somente arquivos necessários para instalar dependências
COPY package*.json ./

# Instala dependências mais rápido e silenciosamente
RUN npm install --prefer-offline --no-audit

# Copia o restante da aplicação
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta da API
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/app.js"]
