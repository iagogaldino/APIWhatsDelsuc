
# WhatsApp API Documentation

A RESTful API developed in Node.js with TypeScript using the venom-bot library for WhatsApp integration.

## 🚀 Technologies

- Node.js
- TypeScript
- Express
- PostgreSQL
- Venom-bot
- Socket.io
- Docker

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL
- Docker (optional)

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env-example`:

```env
# PostgreSQL database variables
DB_HOST=localhost
DB_NAME=whatsapp_api
DB_USER=postgres
DB_PASS=admin
DB_PORT=5432
```

### Local Installation

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build

# Run in production
npm start
```

### Docker

You can either build the image locally or pull it from Docker Hub:

```bash
# Pull from Docker Hub
docker pull iagogaldino/api-whatsapp:latest

# Or build locally
docker build -t whatsapp-api .

# Run the container
docker run -p 5500:5500 --name whatsapp-api whatsapp-api
```

## 📱 Web Interface

Access `http://localhost:5500` to view the QR Code interface and WhatsApp connection.

## 🔌 Endpoints

### Create Session

```http
POST /api/generate-uuid

Response:
{
    "uuid": "string"
}
```

### Send Text Message

```http
POST /api/messages

Body:
{
    "to": "5511999999999@c.us",
    "message": "Hello World!"
}
```

### Send Image from URL

```http
POST /api/images/url

Body:
{
    "to": "5511999999999@c.us",
    "imageUrl": "https://example.com/image.jpg",
    "caption": "Optional caption"
}
```

### Send Image by Upload

```http
POST /api/images
Content-Type: multipart/form-data

Form Data:
- to: "5511999999999@c.us"
- image: [file]
- caption: "Optional caption"
```

### Send Base64 File

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

### End Session

```http
DELETE /api/close
```

## 🔄 Connection Status

The API uses Socket.IO for real-time connection status:

- `connecting`: Starting connection
- `waitingQR`: Waiting for QR Code scan
- `connected`: WhatsApp connected
- `disconnected`: Disconnected

## ⚠️ Notes

1. Phone number format: `DDDNumber@c.us`
2. For groups use: `DDDNumber-GroupId@g.us`
3. Base64 images must include MIME prefix
4. QR Code expires after 20 seconds

## 🚀 Deployment

The application is configured for deployment via Docker, with all necessary dependencies including Chromium for venom-bot.

The server runs on port 5500 by default.
