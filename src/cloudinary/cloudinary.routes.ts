import express from "express";
import multer from "multer";

import { uploadImageUnsigned } from "./cloudinary.controller";
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const cloudinaryRoutes = express.Router();

cloudinaryRoutes.post(
  "/upload-image",
  upload.single("image"),
  uploadImageUnsigned
);
