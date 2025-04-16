
import { Router } from "express";
import multer from "multer";
import { sessionControllerMiddleware } from "../middleware/das";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

router.use(sessionControllerMiddleware);

router.post("/create", (req: any, res) => req.sessionController.create(req, res));
router.post("/reconnect", (req: any, res) => req.sessionController.reconnect(req, res));
router.post("/messages", (req: any, res) => req.sessionController.sendMessage(req, res));
router.post("/images", upload.single('image'), (req: any, res) => req.sessionController.sendImageWithText(req, res));
router.post("/images/url", (req: any, res) => req.sessionController.sendImageFromUrl(req, res));
router.post("/files", upload.single('image'), (req: any, res) => req.sessionController.sendFileBase64(req, res));
router.delete("/close", (req: any, res) => req.sessionController.close(req, res));

export { router };
