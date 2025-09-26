import { NextFunction, Request, Response } from "express";

import { error } from "console";
import { CustomError } from "../errorHandler/errorHandle";

const ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    error: err.message || "internal server error!!",
  });
};
export { ErrorHandler };
