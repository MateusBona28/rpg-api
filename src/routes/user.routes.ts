import { Router } from "express";
import { userController } from "../controller/User.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

export const userRoutes = Router();

userRoutes.post('/users', userController.post);
userRoutes.get('/users/:username', verifyAuthMiddleware, userController.getById);
userRoutes.get('/users', verifyAuthMiddleware, userController.getAll);
userRoutes.delete('/users/:id', verifyAuthMiddleware, userController.delete);
userRoutes.patch('/users/:id', verifyAuthMiddleware, userController.patch);