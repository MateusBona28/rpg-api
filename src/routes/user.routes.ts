import { Router } from "express";
import { userController } from "../controller/user.controller";

export const userRoutes = Router()

userRoutes.post('', userController.post)