import { QueryResult } from "pg";
import { pool } from "../config/config";
import { CustomError } from "../errorHandler/errorHandle";
import { AddressType, AddressTypeUpdate } from "./address.types";

export const findAddressByUserId = async (id: string) => {
  const result: QueryResult<AddressType[]> = await pool.query(
    "SELECT * from address WHERE user_id = $1",
    [id]
  );
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

export const findAddressById = async (id: string) => {
  const result: QueryResult<AddressType> = await pool.query(
    "SELECT * FROM address WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`address with ID ${id} not found!`, 404);
  }
  return result.rows[0];
};

export const updateAddress = async (
  id: string,
  AddressTypeUpdate: AddressTypeUpdate
) => {
  const oldData = await findAddressById(id);
  const updatedData = {
    ...oldData,
    ...AddressTypeUpdate,
  };
  const { address_line1, address_line2, city, pincode, state, country } =
    updatedData;

  const result = await pool.query(
    `UPDATE address
     SET address_line1 = $1, address_line2 = $2,  city = $3, pincode = $4, state = $5,country = $6, 
     WHERE id = $7 RETURNING *`,
    [address_line1, address_line2, city, pincode, state, country]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Address with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};
