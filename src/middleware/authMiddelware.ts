import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { UserType } from "../user/user.types";
import { getUserById } from "../user/user.service";

export interface CustomRequest extends Request {
  user?: UserType;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    // const token = req.cookies?.token;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided, Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = verifyToken(token) as { id: string };
    if (!decodedToken.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getUserById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach decoded user data to request
    req.user = user;

    next(); // move to next middleware or controller
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
