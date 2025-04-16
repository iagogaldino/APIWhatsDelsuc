import { Request, Response } from "express";
import { WhatsAppService } from "../services/WhatsAppService";
import { v4 } from "uuid";

export class SessionController {

  constructor(private whatsAppService: WhatsAppService) {
    
  }

  async generateUuid(req: Request, res: Response): Promise<Response> {
    try {
      const uuid = v4();
      return res.status(201).json(
        {uuid});
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

  async sendImageFromUrl(req: Request, res: Response): Promise<Response> {
    try {
      const { sessionId } = req.params;
      const { to, imageUrl, caption } = req.body;

      if (!to) {
        return res.status(400).json({ error: "Recipient (to) is required" });
      }
      if (!imageUrl) {
        return res.status(400).json({ error: "Image URL is required" });
      }

      const result = await this.whatsAppService.sendImageWithText(sessionId, to, imageUrl, caption);
      return res.status(200).json(result);
    } catch (error: any) {
      console.log('API ERROR: ', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async sendImageWithText(req: Request, res: Response): Promise<Response> {
    try {
      const { sessionId } = req.params;
      const { to, imageUrl, base64Image, caption } = req.body;
      const imageFile = req.file;

      if (!to) {
        return res.status(400).json({ error: "Recipient (to) is required" });
      }
      console.log('Received base64Image:', base64Image);
      if (!imageUrl && !base64Image && !imageFile) {
        return res.status(400).json({ error: "Image must be provided via URL, base64, or file upload" });
      }

      let result;
      if (imageFile) {
        result = await this.whatsAppService.sendImageFile(sessionId, to, imageFile.buffer, caption);
      } else if (base64Image) {
        result = await this.whatsAppService.sendBase64Image(sessionId, to, base64Image, caption);
      } else {
        result = await this.whatsAppService.sendImageWithText(sessionId, to, imageUrl, caption);
      }

      return res.status(200).json(result);
    } catch (error: any) {
      console.log('API ERROR: ', error);
      return res.status(500).json({ error: error.message });
    }
  }


  async sendFileBase64(req: Request, res: Response): Promise<Response> {
    try {
      const { sessionId } = req.params;
      const { to, base64, fileName, caption } = req.body;
  
      if (!to) {
        console.log('API ERROR: Recipient (to) is required');
        return res.status(400).json({ error: "Recipient (to) is required" });
      }
  
      if (!base64 || typeof base64 !== 'string') {
        console.log('API ERROR: A valid base64 string is required');
        return res.status(400).json({ error: "A valid base64 string is required" });
      }
  
      if (!fileName || typeof fileName !== 'string') {
        console.log('API ERROR: A valid fileName is required');
        return res.status(400).json({ error: "A valid fileName is required" });
      }
  
      console.log('Received base64Image:', base64.substring(0, 30) + '...'); // Mostra apenas o início do base64 para evitar logs longos
  
      // Verificando se o base64 possui o cabeçalho correto (ex.: data:image/png;base64,)
      const base64Regex = /^data:(.*?);base64,/;
      if (!base64Regex.test(base64)) {
        return res.status(400).json({ error: "The base64 string must include the MIME type prefix (e.g., data:image/png;base64,)" });
      }
  
      // Enviando arquivo usando o serviço do WhatsApp
      const result = await this.whatsAppService.sendFileBase64(sessionId, to, base64, fileName, caption);
  
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