import { create, Whatsapp } from "venom-bot";
import { SessionRepository } from "../repositories/SessionRepository";

export class WhatsAppService {
  private sessions: Map<string, Whatsapp>;
  private sessionRepository: SessionRepository;

  constructor() {
    this.sessions = new Map();
    this.sessionRepository = new SessionRepository();
  }

  async createSession(sessionId: string): Promise<Whatsapp> { // Retornando o client
    try {
      const session = await this.sessionRepository.create(sessionId);
      
      const client = await create(
        sessionId,
        undefined,
        undefined,
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


  async sendMessage(sessionId: string, to: string, message: string): Promise<any> { // Especificar tipo de retorno
    const client = this.sessions.get(sessionId);
    if (!client) {
      throw new Error("Session not found");
    }

    return client.sendText(to, message);
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
