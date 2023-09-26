import { Request, Response } from "express";
import { authService } from "../services/Auth.services";

class AuthController {
  async post(request: Request, response: Response) {
    try {
      const token = await authService.create(request);
      return response.json({ token });
    } catch (error) {
      return response.status(401).json({ message: "invalid login" });
    }
  }
}

export const authController = new AuthController();