import AppDataSource from "../database";
import { User } from "../entities/user.entity";

class UserService {
  userRepository = AppDataSource.getRepository(User)

  async create(requestBody: any) {
    this.userRepository.create(requestBody);
    const newUser = this.userRepository.save(requestBody);
    return newUser
  }
}

export const userService = new UserService();