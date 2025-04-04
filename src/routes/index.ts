import { Router } from "express";
import multer from "multer";
import { sessionControllerMiddleware } from "../middleware/das";

const router = Router();
// const sessionController = new SessionController(whatsAppServiceInstance);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Usa o middleware para todas as rotas
router.use(sessionControllerMiddleware);

router.post("/sessions", (req: any, res) => req.sessionController.create(req, res));
router.post("/sessions/:sessionId/messages", (req: any, res) => req.sessionController.sendMessage(req, res));
router.post("/sessions/:sessionId/images", upload.single('image'), (req: any, res) => req.sessionController.sendImageWithText(req, res));
router.post("/sessions/:sessionId/files", upload.single('image'), (req: any, res) => req.sessionController.sendFileBase64(req, res));
router.delete("/sessions/:sessionId", (req: any, res) => req.sessionController.close(req, res));

export { router };
