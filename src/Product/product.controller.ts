import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middleware/authMiddelware";
import {
  createProduct,
  findAllProduct,
  findProductById,
  updateProduct,
} from "./product.service";
import { ProductType, ProductTypeUpdate } from "./product.types";

export const createNewProduct = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createProduct(req.body as ProductType);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const result = await findAllProduct(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProductbyId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await findProductById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateProduct(id, req.body as ProductTypeUpdate);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
