import AppDataSource from "../database";
import { Character } from "../entities/Character.entity";
import { User } from "../entities/User.entity";

class CharacterServices {
  userRepository = AppDataSource.getRepository(User);
  characterRepository = AppDataSource.getRepository(Character);

  async create(requestBody: any, userRequest: any) {
    const user = await this.userRepository.findOneBy( { id: userRequest.id } );
    const newCharacter = {
      ...requestBody,
      user,
    };
    this.characterRepository.create(newCharacter);
    const characterPostgresResponse = await this.characterRepository.save(newCharacter);

    return characterPostgresResponse;
  }

  async listAllFromUser(userRequest: any) {
    const user: any = await this.userRepository.findOneBy( { id: userRequest.id } )
    const characters = user?.characters;

    return characters;
  }

  async listOneCharacter(characterId: string) {
    const characterExists = await this.characterRepository.findOneBy({ id: characterId });
    if (!characterExists) {
      throw new Error("character not found");
    }

    return characterExists;
  };

  async update(requestBody: any, userRequest: any, characterId: string) {
    const user: any = await this.userRepository.findOneBy( { id: userRequest.id } )
    const characters = user?.characters;

    const characterExists = characters.find( (char: Character) => char.id === characterId );

    if (!characterExists) {
      throw new Error("character not found");
    }

    const updatedCharacterData = {
      user,
      ...characterExists,
      ...requestBody,
    };

    await this.characterRepository.update(characterId, updatedCharacterData);

    return {};
  }

  async remove(userRequest: any, characterId: string) {
    const user: any = await this.userRepository.findOneBy( { id: userRequest.id } )
    const characters = user?.characters;

    const characterExists = characters.find( (char: Character) => char.id === characterId );

    if (!characterExists) {
      throw new Error("character not found");
    }

    await this.characterRepository.delete(characterId);
    return {};
  }
}

export const characterServices = new CharacterServices();