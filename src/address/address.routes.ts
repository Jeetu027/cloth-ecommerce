import express from "express";

import { roleGuard } from "../middleware/roleGuard";
import { UserRole } from "../user/user.types";
import { createNewAddress, getAddressByUserId } from "./address.controller";

export const addressRoutes = express.Router();

addressRoutes.get("/get-address-by-userid", getAddressByUserId);
// productRoutes.get("/:id", getAddressbyId);
// productRoutes.patch("/:id", roleGuard([UserRole.ADMIN]), updateAddressById);
addressRoutes.post("/create-Address", createNewAddress);
// productRoutes.get("/delete-product", deleteProduct);
