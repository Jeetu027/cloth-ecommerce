import { QueryResult } from "pg";
import { pool } from "../config/config";
import { ProductType, ProductTypeUpdate } from "./product.types";
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
    `INSERT into product (name,
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

  return result;
};

export const findAllProduct = async (query?: any) => {
  let whereCondition = " where 1=1 ";

  if (query.isParentProduct == "true") {
    whereCondition += " AND parent_product_id IS NULL ";
  }
  const limit = parseInt(query?.limit) || 4; // default 4 products per page
  const page = parseInt(query?.page) || 1;

  const offset = (page - 1) * limit;

  const result: QueryResult<ProductType[]> = await pool.query(
    `SELECT * FROM product ${whereCondition} ORDER BY id ASC LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  if (result.rows.length === 0) {
    throw new CustomError("Product not found!", 404);
  }
  const countResult = await pool.query(
    `SELECT COUNT(*) AS total FROM product ${whereCondition}`
  );
  const total = parseInt(countResult.rows[0].total);
  const totalPages = Math.ceil(total / limit);

  return {
    data: result.rows,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
    },
  };
};

export const findProductById = async (id: string) => {
  const result: QueryResult<ProductType> = await pool.query(
    "SELECT * FROM product WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`Product with ID ${id} not found!`, 404);
  }
  return result.rows[0];
};

export const updateProduct = async (
  id: string,
  ProductTypeUpdate: ProductTypeUpdate
) => {
  const oldData = await findProductById(id);
  const updatedData = {
    ...oldData,
    ...ProductTypeUpdate,
  };
  const {
    name,
    description,
    parent_product_id,
    color,
    size,
    price,
    quantity,
    product_image,
  } = updatedData;

  const result = await pool.query(
    `UPDATE product 
     SET name = $1, description = $2,  color = $3, size = $4, price = $5,quantity = $6, product_image = $7,parent_product_id=$8
     WHERE id = $9 RETURNING *`,
    [
      name,
      description,
      color,
      size,
      price,
      quantity,
      product_image,
      parent_product_id,
      id,
    ]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Product with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};

// const deleteProduct = async (id: string) => {
//   const result = await pool.query(
//     "DELETE FROM Product WHERE id = $1 RETURNING *",
//     [id]
//   );

//   if (result.rows.length === 0) {
//     throw new CustomError(`Product with ID ${id} not found!`, 404);
//   }

//   return { message: "Product deleted successfully" };
// };
