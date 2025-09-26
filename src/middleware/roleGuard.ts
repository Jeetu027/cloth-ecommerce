import { NextFunction, Response } from "express";
import { CustomRequest } from "./authMiddelware";
import { CustomError } from "../errorHandler/errorHandle";

export const roleGuard = (allowedRoles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      // Check if user exists (should already be set by authMiddleware)
      if (!user) {
        throw new CustomError("user not found!", 404);
      }
      console.log(user);
      const role = user.role;
      if (!role) {
        throw new CustomError("role not found!", 404);
      }

      // Check if user's role is allowed
      if (!allowedRoles.includes(role)) {
        throw new CustomError("Forbidden: Access denied", 403);
      }

      next(); // User is authorized, move to the next middleware/controller
    } catch (error) {
      console.error("Role Guard Error:", error);
      next(error);
    }
  };
};
