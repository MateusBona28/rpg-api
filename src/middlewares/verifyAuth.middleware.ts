import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface RequestWithUser extends Request {
  user: {
    isAdmin: boolean
    id: string
    username: string
  }
};

const verifyAuthMiddleware = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json('invalid token')
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return response.status(401).json('invalid token')
      }

      request.user = {
        isAdmin: decoded.isAdmin,
        id: decoded.id,
        username: decoded.username,
      };

      next();
    }
  );
  
};

export default verifyAuthMiddleware;