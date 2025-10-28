import express from "express";
import {
  createNewProduct,
  getAllProducts,
  getProductbyId,
  updateProductById,
} from "./product.controller";
import { roleGuard } from "../middleware/roleGuard";
import { UserRole } from "../user/user.types";
import { authMiddleware } from "../middleware/authMiddelware";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const productRoutes = express.Router();

productRoutes.get("/get-product", getAllProducts);
productRoutes.get("/:id", getProductbyId);
productRoutes.patch(
  "/:id",
  authMiddleware,
  roleGuard([UserRole.ADMIN]),
  updateProductById
);
productRoutes.post(
  "/create-product",
  authMiddleware,
  roleGuard([UserRole.ADMIN]),
  upload.single("image"),
  createNewProduct
);
// productRoutes.get("/delete-product", deleteProduct);
