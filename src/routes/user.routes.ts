import { Router } from "express";
import { userController } from "../controller/User.controller";

export const userRoutes = Router();

userRoutes.post('/users', userController.post);
userRoutes.get('/users/:username', userController.getById);
userRoutes.get('/users', userController.getAll);
userRoutes.delete('/users/:id', userController.delete);
userRoutes.patch('/users/:id', userController.patch);