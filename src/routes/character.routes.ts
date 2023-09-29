import { Router } from "express";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import { characterController } from "../controller/Character.controller";

export const characterRoutes = Router();

characterRoutes.post("/characters", verifyAuthMiddleware, characterController.post);
characterRoutes.get("/characters", verifyAuthMiddleware, characterController.getAll);
characterRoutes.get("/characters/:id", verifyAuthMiddleware, characterController.getOneCharacter);
characterRoutes.delete("/characters/:id", verifyAuthMiddleware, characterController.delete);
characterRoutes.patch("/characters/:id", verifyAuthMiddleware, characterController.patch);