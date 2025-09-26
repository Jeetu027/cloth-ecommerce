import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  loginUser,
  sendResetPasswordMail,
  updatePassword,
} from "./auth.service";
import { verify } from "crypto";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../middleware/authMiddelware";
import { createUser } from "../user/user.service";

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const loginCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (!result) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // // Set token in HTTP-only cookie
    res.cookie("token", result.token, {
      httpOnly: true, // Secure against XSS
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.status(200).json({
      token: result.token,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await sendResetPasswordMail({ email });
    // Verify the token and reset the password
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUserPassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { newPassword } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await updatePassword(userId, newPassword);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  createNewUser,
  loginCurrentUser,
  // getCurrentUser,
  resetPassword,
  updateUserPassword,
};
