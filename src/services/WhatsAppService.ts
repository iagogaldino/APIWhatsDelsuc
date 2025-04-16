import { create, Whatsapp } from "venom-bot";
import { SessionRepository } from "../repositories/SessionRepository";
import { ioApp } from "../app";

export class WhatsAppService {
  private sessions: Map<string, Whatsapp>;
  private sessionRepository: SessionRepository;
  private connectionStates: Map<string, string>;

  constructor() {
    this.sessions = new Map();
    this.connectionStates = new Map();
    this.sessionRepository = new SessionRepository();
  }

  private updateConnectionState(sessionId: string, state: string) {
    this.connectionStates.set(sessionId, state);
    if (ioApp) {
      ioApp.to(sessionId).emit('connectionState', state);
    }
  }

  async getConnectionState(sessionId: string): Promise<string> {
    return this.connectionStates.get(sessionId) || 'disconnected';
  }

  private io: any;

  setSocketIO(io: any) {
    this.io = io;
  }

  async createSession(sessionId: string): Promise<Whatsapp> {
    try {
      const session = await this.sessionRepository.create(sessionId);
  
      const client = await create(
        sessionId,
        (qr) => {
          if (ioApp) {
            console.log("QR Code received");
            ioApp.to(sessionId).emit('qr', qr); // Emite o QR Code para o frontend via socket
          } 
        },
        (statusSession) => {
          console.log(`Session status: ${statusSession}`);
          ioApp.to(sessionId).emit('ready'); // Informa ao frontend que a sessão está pronta
        },
        {
          headless: 'new', // Corrigido para um boolean, que é o valor esperado pelo Venom
        }
      );
  
      this.sessions.set(sessionId, client);
      await this.sessionRepository.updateStatus(sessionId, "started");
  
      return client;
    } catch (error: any) {
      await this.sessionRepository.updateStatus(sessionId, "error");
      throw new Error(`Failed to create session: ${error.message}`);
    }
  }


  async sendMessage(sessionId: string, to: string, message: string): Promise<any> {
    const client = this.sessions.get(sessionId);
    if (!client) {
      throw new Error("Session not found");
    }

    return client.sendText(to, message);
  }

  async sendImageWithText(sessionId: string, to: string, imageUrl: string, caption?: string): Promise<any> {
    const client = this.sessions.get(sessionId);
    if (!client) {
      throw new Error("Session not found");
    }

    return client.sendImage(to, imageUrl, 'image', caption);
  }

  async sendImageFile(sessionId: string, to: string, buffer: Buffer, caption?: string): Promise<any> {
    const client = this.sessions.get(sessionId);
    if (!client) {
      throw new Error("Session not found");
    }

    return client.sendImageFromBase64(to, buffer.toString('base64'), 'image', caption);
  }

  async sendBase64Image(sessionId: string, to: string, base64Image: string, caption?: string): Promise<any> {
    const client = this.sessions.get(sessionId);
    if (!client) {
      throw new Error("Session not found");
    }

    return client.sendImageFromBase64(to, base64Image, 'image', caption);
  }
  
  async sendFileBase64(sessionId: string, to: string, base64: string, filename: string, caption?: string, passId?: any): Promise<any> {
    const client = this.sessions.get(sessionId);
    if (!client) {
      throw new Error("Session not found");
    }

    return client.sendFileFromBase64(to, base64, filename, caption);
  }

  async closeSession(sessionId: string): Promise<void> {
    const client = this.sessions.get(sessionId);
    if (client) {
      await client.close();
      this.sessions.delete(sessionId);
      await this.sessionRepository.updateStatus(sessionId, "closed");
    } else {
      throw new Error("Session not found or already closed"); // Adiciona mensagem de erro para feedback claro
    }
  }
}
