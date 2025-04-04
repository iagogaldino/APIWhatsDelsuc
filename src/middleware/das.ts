import { Request, Response, NextFunction } from "express";
import { whatsAppServiceInstance } from "../app";
import { SessionController } from "../controllers/SessionController";

// Middleware para injetar o SessionController em cada requisição
const sessionControllerMiddleware = (req: any, res: Response, next: NextFunction) => {
    req.sessionController = new SessionController(whatsAppServiceInstance);
    next();
};

export interface RequestWithSessionController extends Request {
    sessionController: SessionController;
}


export { sessionControllerMiddleware };
