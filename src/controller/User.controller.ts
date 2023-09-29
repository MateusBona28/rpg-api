import { Request, Response } from "express";
import { userService } from "../services/User.services";

class UserController {
  async post(request: Request, response: Response) {
    try {
      const userResponse = await userService.create( request.body );
      return response.status(201).json(userResponse);
    } catch (error) {
      if ( error instanceof Error ) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500)
    }
  }

  async getAll(request: Request, response: Response) {
    const userArrayResponse = await userService.listAll();
    return response.json(userArrayResponse);
  }

  async getById(request: Request, response: Response) {
    const { username } = request.params;
    const userResponse = await userService.searchByUsername( username );
    return response.json(userResponse);
  }

  async patch(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const updatedUser = await userService.update( request.body, id );
      return response.json(updatedUser);
    } catch (error: any) {
      return response.status(404).json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response ) {
    try {
      const { id } = request.params;
      await userService.remove( id );
      return response.status(204).json({});
    } catch (error: any) {
      return response.status(404).json({ message: error.message });
    }
  }
}

export const userController = new UserController();