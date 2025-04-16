
# WhatsApp API Documentation

Esta é uma API RESTful desenvolvida em Node.js com TypeScript que utiliza a biblioteca venom-bot para integração com WhatsApp.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- Venom-bot
- Socket.io
- Docker

## 📋 Pré-requisitos

- Node.js 20+
- PostgreSQL
- Docker (opcional)

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env-example`:

```env
# PostgreSQL database variables
DB_HOST=localhost
DB_NAME=whatsapp_api
DB_USER=postgres
DB_PASS=admin
DB_PORT=5432
```

### Instalação Local

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Executar em produção
npm start
```

### Docker

```bash
# Construir a imagem
docker build -t whatsapp-api .

# Executar o container
docker run -p 5500:5500 --name whatsapp-api whatsapp-api
```

## 📱 Interface Web

Acesse `http://localhost:5500` para visualizar a interface de QR Code e conexão com WhatsApp.

## 🔌 Endpoints

### Criar Sessão

```http
POST /api/generate-uuid

Resposta:
{
    "uuid": "string"
}
```

### Enviar Mensagem de Texto

```http
POST /api/messages

Body:
{
    "to": "5511999999999@c.us",
    "message": "Hello World!"
}
```

### Enviar Imagem por URL

```http
POST /api/images/url

Body:
{
    "to": "5511999999999@c.us",
    "imageUrl": "https://example.com/image.jpg",
    "caption": "Optional caption"
}
```

### Enviar Imagem por Upload

```http
POST /api/images
Content-Type: multipart/form-data

Form Data:
- to: "5511999999999@c.us"
- image: [arquivo]
- caption: "Optional caption"
```

### Enviar Arquivo Base64

```http
POST /api/files

Body:
{
    "to": "5511999999999@c.us",
    "base64": "data:image/jpeg;base64,...",
    "fileName": "image.jpg",
    "caption": "Optional caption"
}
```

### Encerrar Sessão

```http
DELETE /api/close
```

## 🔄 Status de Conexão

A API utiliza Socket.IO para comunicação em tempo real dos estados de conexão:

- `connecting`: Iniciando conexão
- `waitingQR`: Aguardando leitura do QR Code
- `connected`: WhatsApp conectado
- `disconnected`: Desconectado

## ⚠️ Observações

1. O número de telefone deve seguir o formato: `DDDNúmero@c.us`
2. Para grupos use: `DDDNúmero-GroupId@g.us`
3. Imagens em base64 devem incluir o prefixo MIME
4. O QR Code expira após 20 segundos

## 🚀 Deploy

A aplicação está configurada para deploy via Docker, com todas as dependências necessárias incluindo o Chromium para o venom-bot.

O servidor roda na porta 5500 por padrão.
