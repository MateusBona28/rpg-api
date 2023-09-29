import { Request, Response, response } from "express";
import { characterServices } from "../services/Character.services";

class CharacterController {
  async post(request: any, response: Response) {
    const characterResponse = await characterServices.create(request.body, request.user);
    return response.status(201).json(characterResponse);
  }

  async getAll(request: any, response: Response) {
    const charactersResponse = await characterServices.listAllFromUser(request.user.id);
    return response.json(charactersResponse);
  }

  async getOneCharacter(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const character = await characterServices.listOneCharacter(id);
      return response.json(character);
    } catch (error) {
      if ( error instanceof Error ) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500)
    }
  }

  async patch(request: any, response: Response) {
    try {
      const { id } = request.params;
      const updatedCharacterResponse = await characterServices.update(request.body, request.user, id);
      return response.json(updatedCharacterResponse);
    } catch (error) {
      if ( error instanceof Error ) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500)
    }
  }

  async delete(request: any, response: Response) {
    try {
      const { id } = request.params;
      const deleteNoBodyResponse = await characterServices.remove(request.user, id);
      return response.status(204).json(deleteNoBodyResponse);
    } catch (error) {
      if ( error instanceof Error ) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500)
    }
  }
};

export const characterController = new CharacterController();