import { create, Whatsapp } from "venom-bot";
import { SessionRepository } from "../repositories/SessionRepository";

export class WhatsAppService {
  private sessions: Map<string, Whatsapp>;
  private sessionRepository: SessionRepository;

  constructor() {
    this.sessions = new Map();
    this.sessionRepository = new SessionRepository();
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
          if (this.io) {
            this.io.to(sessionId).emit('qr', qr);
          }
        },
        (statusSession) => {
          if (statusSession === 'qrReadSuccess' && this.io) {
            this.io.to(sessionId).emit('ready');
          }
        },
        {
          headless: 'new'
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
