import { QueryResult } from "pg";
import { pool } from "../config/config";
import { ProductType } from "./product.types";
import { CustomError } from "../errorHandler/errorHandle";

export const createProduct = async (productdata: ProductType) => {
  const {
    id,
    name,
    description,
    parent_product_id,
    color,
    size,
    price,
    quantity,
    product_image,
  } = productdata;
  const result: QueryResult<ProductType> = await pool.query(
    `INSERT into Product (name,
    description,
    parent_product_id,
    color,
    size,
    price,
    quantity,
    product_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      name,
      description,
      parent_product_id,
      color,
      size,
      price,
      quantity,
      product_image,
    ]
  );
};

export const findAllProduct = async () => {
  const result = await pool.query("SELECT * FROM product ORDER BY id ASC");
  if (result.rows.length === 0) {
    throw new CustomError("Product not found!", 404);
  }
  return result.rows;
};
