import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/authMiddelware";
import { uploadImage } from "./cloudinary.service";

export const uploadImageUnsigned = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const base64Image = `data:${
    req.file.mimetype
  };base64,${req.file.buffer.toString("base64")}`;
  const result = await uploadImage(base64Image);
  res.json(result);
};
