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

router.post("/create", (req: any, res) => req.sessionController.create(req, res));
router.post("/:sessionId/messages", (req: any, res) => req.sessionController.sendMessage(req, res));
router.post("/:sessionId/images", upload.single('image'), (req: any, res) => req.sessionController.sendImageWithText(req, res));
router.post("/:sessionId/images/url", (req: any, res) => req.sessionController.sendImageFromUrl(req, res));
router.post("/:sessionId/files", upload.single('image'), (req: any, res) => req.sessionController.sendFileBase64(req, res));
router.delete("/:sessionId", (req: any, res) => req.sessionController.close(req, res));

export { router };
