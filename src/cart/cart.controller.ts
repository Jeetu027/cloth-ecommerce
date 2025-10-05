import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/authMiddelware";
import { getUserFromReqest } from "../utils/utils";
import {
  createNewCart,
  deleteCart,
  findCartByUserId,
  updateCart,
} from "./cart.service";
import { CartTypes, CartTypeUpdate } from "./cart.types";

export const getCartByUserId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = getUserFromReqest(req);
    const result = await findCartByUserId(user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createCart = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = getUserFromReqest(req);
    const result = await createNewCart({
      ...(req.body as CartTypes),
      user_id: user.id,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCartById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateCart(id, req.body as CartTypeUpdate);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCartById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteCart(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
