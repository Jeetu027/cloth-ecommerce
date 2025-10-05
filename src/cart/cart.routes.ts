import express from "express";
import {
  createCart,
  deleteCartById,
  getCartByUserId,
  updateCartById,
} from "./cart.controller";

export const cartRoutes = express.Router();

cartRoutes.get("/get-cart-byid", getCartByUserId);
cartRoutes.post("/create-cart", createCart);
cartRoutes.patch("/:id", updateCartById);
cartRoutes.delete("/:id", deleteCartById);
