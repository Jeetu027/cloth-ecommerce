import express from "express";

import {
  createNewAddress,
  getAddressbyId,
  getAddressByUserId,
  updateAddressById,
} from "./address.controller";

export const addressRoutes = express.Router();

addressRoutes.get("/get-address-by-userid", getAddressByUserId);
addressRoutes.get("/:id", getAddressbyId);
addressRoutes.patch("/:id", updateAddressById);
addressRoutes.post("/create-Address", createNewAddress);
