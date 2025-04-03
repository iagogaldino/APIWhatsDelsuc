import { Router } from "express";
import { SessionController } from "../controllers/SessionController";

const router = Router();
const sessionController = new SessionController();

router.post("/sessions", (req, res) => sessionController.create(req, res));
router.post("/sessions/:sessionId/messages", (req, res) => sessionController.sendMessage(req, res));
router.post("/sessions/:sessionId/images", (req, res) => sessionController.sendImageWithText(req, res));
router.delete("/sessions/:sessionId", (req, res) => sessionController.close(req, res));

export { router };