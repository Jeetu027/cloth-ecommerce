import { QueryResult } from "pg";
import { pool } from "../config/config";
import { UsersTypeUpdate, UserType } from "./user.types";
import { RegisterType } from "../auth/auth.types";
import { hashPassword } from "../utils/bcrypt";
import { CustomError } from "../errorHandler/errorHandle";

export const getUserById = async (id: string) => {
  const result: QueryResult<UserType> = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const createUser = async (userData: RegisterType) => {
  const { name, email, password } = userData;
  const hashedPassword = await hashPassword(password);
  const result: QueryResult<RegisterType> = await pool.query(
    `INSERT INTO users (name, email, password) 
     VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result: QueryResult<UserType> = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

export const updateUsers = async (UsersData: UsersTypeUpdate) => {
  const { id } = UsersData;
  const oldData = await getUserById(id);
  const updatedData = {
    ...oldData,
    ...Object.fromEntries(
      Object.entries(UsersData).filter(([_, value]) => value !== undefined)
    ),
  };

  const { name: newName, email: newEmail, password: newPassword } = updatedData;

  const result: QueryResult<UserType> = await pool.query(
    `UPDATE Users 
     SET name = $1, email = $2, password = $3, created_at = $4, contact_no = $5, profile_img = $6
     WHERE id = $7 RETURNING *`,
    [
      newName,
      newEmail,
      newPassword,
      updatedData.created_at,
      updatedData.contact_no,
      updatedData.profile_img,
      id,
    ]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Users with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};
