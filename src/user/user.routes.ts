import express from "express";

import { getCurrentUser } from "./user.controller";

export const userRoutes = express.Router();

userRoutes.get("/getuser", getCurrentUser);
userRoutes.patch("/updateuser", getCurrentUser);
