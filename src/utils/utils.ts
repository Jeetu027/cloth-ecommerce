import { CustomError } from "../errorHandler/errorHandle";
import { CustomRequest } from "../middleware/authMiddelware";

export const getUserFromReqest = (req: CustomRequest) => {
  const user = req.user;
  if (!user) {
    throw new CustomError("User not found!", 404);
  }
  return user;
};
