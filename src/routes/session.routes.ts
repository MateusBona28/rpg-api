import { Router } from "express";
import { authController } from "../controller/Auth.controller";

export const authRoutes = Router();

authRoutes.post('/auth', authController.post);