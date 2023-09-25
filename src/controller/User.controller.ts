import { Request, Response } from "express";
import { userService } from "../services/User.services";

export class UserController {
  async post(request: Request, response: Response) {
    const userResponse = await userService.create( request.body );

    return response.json(userResponse);
  }
}

export const userController = new UserController();