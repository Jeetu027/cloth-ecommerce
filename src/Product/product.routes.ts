import express from "express";
import {
  createNewProduct,
  getAllProducts,
  getProductbyId,
  updateProductById,
} from "./product.controller";
import { roleGuard } from "../middleware/roleGuard";
import { UserRole } from "../user/user.types";

export const productRoutes = express.Router();

productRoutes.get("/get-product", getAllProducts);
productRoutes.get("/:id", getProductbyId);
productRoutes.patch("/:id", roleGuard([UserRole.ADMIN]), updateProductById);
productRoutes.post(
  "/create-product",
  roleGuard([UserRole.ADMIN]),
  createNewProduct
);
// productRoutes.get("/delete-product", deleteProduct);
