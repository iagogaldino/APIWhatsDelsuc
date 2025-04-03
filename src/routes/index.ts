import { Router } from "express";
import multer from "multer";
import { SessionController } from "../controllers/SessionController";

const router = Router();
const sessionController = new SessionController();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.post("/sessions", (req, res) => sessionController.create(req, res));
router.post("/sessions/:sessionId/messages", (req, res) => sessionController.sendMessage(req, res));
router.post("/sessions/:sessionId/images", upload.single('image'), (req, res) => sessionController.sendImageWithText(req, res));
router.delete("/sessions/:sessionId", (req, res) => sessionController.close(req, res));

export { router };