import { QueryResult } from "pg";
import { pool } from "../config/config";
import { CustomError } from "../errorHandler/errorHandle";
import { CartTypes, CartTypeUpdate } from "./cart.types";

export const findCartByUserId = async (id: string) => {
  const result: QueryResult<CartTypes> = await pool.query(
    `SELECT 
  c.*, 
  to_jsonb(p.*) AS product
FROM cart c
LEFT JOIN product p ON c.product_id = p.id
WHERE c.user_id = $1;
`,
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`cart with User_ID ${id} not found!`, 404);
  }
  return result.rows;
};

export const createNewCart = async (cartdata: CartTypes) => {
  const { product_id, user_id, quantity } = cartdata;
  if (!user_id) {
    throw new CustomError("User id not found", 404);
  }
  if (!product_id) {
    throw new CustomError("Product id not found", 404);
  }
  const result: QueryResult<CartTypes> = await pool.query(
    `INSERT into cart (
     product_id,user_id,quantity) VALUES ($1, $2, $3) RETURNING *`,
    [product_id, user_id, quantity]
  );
};

export const findCartById = async (id: string) => {
  const result: QueryResult<CartTypes> = await pool.query(
    "SELECT * FROM cart WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`Cart with ID ${id} not found!`, 404);
  }
  return result.rows[0];
};

export const updateCart = async (
  id: string,
  CartTypeUpdate: CartTypeUpdate
) => {
  const oldData = await findCartById(id);
  const updatedData = {
    ...oldData,
    ...CartTypeUpdate,
  };
  const { quantity } = updatedData;

  const result = await pool.query(
    `UPDATE cart 
     SET quantity = $1
     WHERE id = $2 RETURNING *`,
    [quantity, id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Cart with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};

export const deleteCart = async (id: string) => {
  const cart = await findCartById(id);
  if (!cart) {
    throw new CustomError("Cart not found!", 404);
  }

  const result = await pool.query(
    `delete from cart where id = $1 returning *`,
    [id]
  );
  return result;
};
