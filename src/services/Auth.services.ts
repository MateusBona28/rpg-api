import { compare } from "bcryptjs";
import { userService } from "./User.services";
import jwt  from 'jsonwebtoken';

class AuthService {
  async create(request: any) {
    const { username, password } = request.body;

  if (!username || !password) {
    throw new Error("invalid username or password");
  }

  const user: any = await userService.searchByUsername(username);

  if (!user) {
    throw new Error("user not found.");
  }

  const passwordIsValid = await compare(password, user.password);

  if (!passwordIsValid) {
    throw new Error("invalid email or password.");
  }

  const token = jwt.sign(
    {
      email: user.username,
      isAdm: user.isAdm,
      id: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "7d",
      subject: user.id,
    }
  );

  return token;
  }
}

export const authService = new AuthService();