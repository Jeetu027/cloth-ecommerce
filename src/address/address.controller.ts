import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/authMiddelware";
import { createAddress, findAddressByUserId } from "./address.service";
import { CustomError } from "../errorHandler/errorHandle";
import { AddressType } from "./address.types";
import { getUserFromReqest } from "../utils/utils";

export const getAddressByUserId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = getUserFromReqest(req);

    const result = await findAddressByUserId(user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createNewAddress = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = getUserFromReqest(req);

    const result = await createAddress({
      ...(req.body as AddressType),
      user_id: user.id,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
