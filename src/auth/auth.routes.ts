import express from "express";
import {
  createNewUser,
  // getCurrentUser,
  loginCurrentUser,
  resetPassword,
  updateUserPassword,
} from "./auth.controller";
import { authMiddleware } from "../middleware/authMiddelware";

export const authRoutes = express.Router();

authRoutes.post("/register", createNewUser);
authRoutes.post("/login", loginCurrentUser);
// router.get("/getuser", authMiddleware, getCurrentUser);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/update-password", authMiddleware, updateUserPassword);
