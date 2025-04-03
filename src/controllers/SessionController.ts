import { Request, Response } from "express";
import { WhatsAppService } from "../services/WhatsAppService";

export class SessionController {
  private whatsAppService: WhatsAppService;

  constructor() {
    this.whatsAppService = new WhatsAppService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "SessionId is required" });
      }

      await this.whatsAppService.createSession(sessionId);
      return res.status(201).json({ message: "Session created successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async sendMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { sessionId } = req.params;
      const { to, message } = req.body;

      if (!to || !message) {
        return res.status(400).json({ error: "To and message are required" });
      }

      const result = await this.whatsAppService.sendMessage(sessionId, to, message);
      return res.status(200).json(result);
    } catch (error: any) {
      console.log('API ERROR: ', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async close(req: Request, res: Response): Promise<Response> {
    try {
      const { sessionId } = req.params;
      await this.whatsAppService.closeSession(sessionId);
      return res.status(200).json({ message: "Session closed successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}