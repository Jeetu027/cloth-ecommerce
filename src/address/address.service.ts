import { QueryResult } from "pg";
import { pool } from "../config/config";
import { CustomError } from "../errorHandler/errorHandle";
import { AddressType } from "./address.types";

export const findAddressByUserId = async (id: string) => {
  const result = await pool.query("SELECT * from address WHERE user_id = $1", [
    id,
  ]);
  if (result.rows.length === 0) {
    throw new CustomError(`Address with User_ID ${id} not found!`, 404);
  }
  return result.rows;
};

export const createAddress = async (productdata: AddressType) => {
  const {
    user_id,
    address_line1,
    address_line2,
    city,
    pincode,
    state,
    country,
  } = productdata;
  if (!user_id) {
    throw new CustomError("user id not found", 404);
  }
  const result: QueryResult<AddressType> = await pool.query(
    `INSERT into address ( 
    user_id,
    address_line1,
    address_line2,
    city,
    pincode,
    state,
    country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [user_id, address_line1, address_line2, city, pincode, state, country]
  );
};
