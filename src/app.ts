import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { router } from "./routes";
import { AppDataSource } from "./database";
import { WhatsAppService } from "./services/WhatsAppService";

const port = 5500;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const whatsAppService = new WhatsAppService();
export const whatsAppServiceInstance = whatsAppService;

// Middleware para aumentar o limite permitido para JSON e URL-encoded (50mb)
app.use(express.json({ limit: '50mb' }));  // Permite requisições JSON até 50MB
app.use(express.urlencoded({ extended: true, limit: '50mb' }));  // Permite requisições URL-encoded até 50MB

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.get('/qr/:sessionId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'qr.html'));
});

// Configuração do Socket.IO
export let ioApp: any = io;
io.on('connection', (socket) => {
  socket.on('join', (sessionId) => {
    console.log(`User joined session: ${sessionId}`);
    socket.join(sessionId);
  });
  
  socket.on('start-connection', (sessionId) => {
    console.log(`User connect session: ${sessionId}`);
    whatsAppService.createSession(sessionId);
  });
});

AppDataSource.initialize().then(() => {
  httpServer.listen(port, "localhost", () => {
    console.log(`Server running on port ${port}`);
  });
});

export { app };
