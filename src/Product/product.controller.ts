import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middleware/authMiddelware";
import {
  createProduct,
  findAllProduct,
  findProductById,
  updateProduct,
} from "./product.service";
import { ProductType, ProductTypeUpdate } from "./product.types";
import { uploadImage } from "../cloudinary/cloudinary.service";

export const createNewProduct = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const base64Image = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const resultImage = await uploadImage(base64Image);

    req.body.product_image = resultImage.url;
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
