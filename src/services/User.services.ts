import { hash } from "bcryptjs";
import AppDataSource from "../database";
import { User } from "../entities/User.entity";

class UserService {
  userRepository = AppDataSource.getRepository(User)

  async create(requestBody: any) {
    const userAlreadyExists = await this.userRepository.findOneBy( {username: requestBody.username } );
    if ( userAlreadyExists ) {
      throw new Error("user already exists");
    }
    const hashedPassword = await hash(requestBody.password, 10);
    const userToRegister = {
      ...requestBody,
      password: hashedPassword,
    };
    this.userRepository.create(userToRegister);
    const newUser = await this.userRepository.save(userToRegister);
    return newUser
  }

  async listAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async searchByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }

  async update(requestBody: any, id: string) {
    const userAlreadyExists = await this.userRepository.findOneBy({ id });
    if ( !userAlreadyExists ) {
      throw new Error("user not found");
    }

    const updatePayload = {
      ...userAlreadyExists,
      ...requestBody,
    };

    await this.userRepository.update(id, updatePayload);

    return updatePayload;
  }

  async remove(id: string) {
    const userAlreadyExists = await this.userRepository.findOneBy({ id });
    if ( !userAlreadyExists ) {
      throw new Error("user not found");
    }
    await this.userRepository.delete(id);
    return true;
  }
}

export const userService = new UserService();