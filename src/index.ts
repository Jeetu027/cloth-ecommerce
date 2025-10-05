import express from "express";
import cors from "cors";
import { ErrorHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/authMiddelware";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRoutes } from "./auth/auth.routes";
import { userRoutes } from "./user/user.routes";
import { productRoutes } from "./Product/product.routes";
import { addressRoutes } from "./address/address.routes";
import { cartRoutes } from "./cart/cart.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.use(authMiddleware);

app.use("/user", userRoutes);
app.use("/address", addressRoutes);
app.use("/cart", cartRoutes);
app.use(ErrorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
