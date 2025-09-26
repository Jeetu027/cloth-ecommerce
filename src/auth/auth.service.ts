import { QueryResult } from "pg";
import { pool } from "../config/config";
import { RegisterType } from "./auth.types";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { UserType } from "../user/user.types";
import brevoService from "../brevo/brevo.service";
import { getUserByEmail } from "../user/user.service";

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return null;

  const token = generateToken(user.id);
  return { token };
};

const sendResetPasswordMail = async (sendResetPasswordDto: {
  email: string;
}) => {
  const user = await getUserByEmail(sendResetPasswordDto.email);
  if (!user) {
    throw new Error("User not found");
  }

  const token = generateToken(user.id);

  brevoService.sendEmail({
    to: user.email,

    subject: "Reset Password",
    htmlContent: `<p>Click the link to reset your password: <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Reset Password</a></p>`,
    textContent: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
  });
  return { message: "Reset password email sent" };
};

const updatePassword = async (userId: string, newPassword: string) => {
  const hashedPassword = await hashPassword(newPassword);
  await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [
    hashedPassword,
    userId,
  ]);
  return { message: "Password updated successfully" };
};

export { loginUser, sendResetPasswordMail, updatePassword };
