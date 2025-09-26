import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middleware/authMiddelware";
import { updateUsers } from "./user.service";

export const getCurrentUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUsersById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { password, ...data } = req.body;

    const result = await updateUsers({ id , ...data }); // Pass the id and updated data to the service
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
